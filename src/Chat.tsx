import {useEffect, useMemo, useState} from 'react'
import {useLiveQuery} from 'electric-sql/react'
import {genUUID} from 'electric-sql/util'
import {Messages as Message} from './generated/client'

import {useElectric} from './lib/electric'

const Chat = () => {
  const {db} = useElectric()!
  const {results} = useLiveQuery(db.messages.liveMany({orderBy: {time: 'asc'}}))
  const [text, setText] = useState('')

  const user = useMemo(() => genUUID(), [])

  useEffect(() => {
    const syncMessages = async () => {
      const shape = await db.messages.sync()

      await shape.synced
    }

    syncMessages()
  }, [])

  const addMessage = async () => {
    await db.messages.create({
      data: {
        id: genUUID(),
        user_id: user,
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
      <h1>{`User: ${user}`}</h1>
      {messages.map((message: Message) => (
        <div key={message.id} className='message'>
          <div>{`${message.user_id}: ${message.text}`}</div>
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
