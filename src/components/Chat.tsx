import {useEffect, useState} from 'react'
import {useLiveQuery} from 'electric-sql/react'
import {genUUID} from 'electric-sql/util'
import type {User} from '../../authenticator/authentication.d'

import {useAuth} from '../contexts/AuthContext'
import {useElectric} from '../contexts/ElectricContext'
import {Messages as Message} from '../generated/client'
import './Chat.css'

const MessageBox = ({message, user}: {message: Message; user: User}) => {
  const mine = message.user_id === user.id
  const text = mine ? message.text : `${message.username}: ${message.text}`

  return (
    <div key={message.id} className={mine ? 'Chat-me' : 'Chat-them'}>
      <div>{text}</div>
    </div>
  )
}

const Chat = () => {
  const auth = useAuth()
  const {db} = useElectric()!
  const {results} = useLiveQuery(db.messages.liveMany({orderBy: {time: 'asc'}}))
  const [text, setText] = useState('')

  useEffect(() => {
    const syncMessages = async () => {
      const shape = await db.messages.sync()

      await shape.synced
    }

    syncMessages()
  }, [])

  if (!auth.user) {
    return null
  }

  const user = auth.user!

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await db.messages.create({
      data: {
        id: genUUID(),
        user_id: user.id,
        username: user.name,
        time: new Date().toISOString(),
        text
      }
    })
    setText('')
  }

  const clearMessages = async () => {
    await db.messages.deleteMany()
  }

  const onChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(event.target.value)
  }

  const messages: Message[] = results ?? []

  return (
    <div>
      <div className='Chat'>
        {messages.map((message: Message) => (
          <MessageBox key={message.id} message={message} user={user} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={text} onChange={onChange} />
        <button type='submit'>Send</button>
      </form>
      <div className='actions'>
        <button className='button' onClick={clearMessages}>
          Clear chat history
        </button>
      </div>
    </div>
  )
}

export default Chat
