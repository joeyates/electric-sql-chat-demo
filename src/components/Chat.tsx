import {useEffect, useState} from 'react'
import {useLiveQuery} from 'electric-sql/react'
import {genUUID} from 'electric-sql/util'

import {useAuth} from '../contexts/AuthContext'
import {Messages as Message} from '../generated/client'
import {useElectric} from '../contexts/ElectricContext'

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

  const addMessage = async () => {
    if (!auth.user) {
      return
    }
    await db.messages.create({
      data: {
        id: genUUID(),
        user_id: auth.user.id,
        username: auth.user.name,
        time: new Date().toISOString(),
        text
      }
    })
    setText('')
  }

  const clearMessages = async () => {
    await db.messages.deleteMany()
  }

  const onChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const messages: Message[] = results ?? []

  return (
    <div>
      {messages.map((message: Message) => (
        <div key={message.id} className='message'>
          <div>{`${message.username}: ${message.text}`}</div>
        </div>
      ))}
      <div className='controls'>
        <input type='text' value={text} onChange={onChange} />
        <button className='button' onClick={addMessage}>
          Add
        </button>
        <button className='button' onClick={clearMessages}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default Chat
