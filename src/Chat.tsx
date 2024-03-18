import {useEffect, useMemo, useState} from 'react'
import {LIB_VERSION} from 'electric-sql/version'
import {makeElectricContext, useLiveQuery} from 'electric-sql/react'
import {genUUID, uniqueTabId} from 'electric-sql/util'
import {Electric, Messages as Message, schema} from './generated/client'
import {ElectricDatabase, electrify} from 'electric-sql/wa-sqlite'

import {authToken} from './auth'

const {ElectricProvider, useElectric} = makeElectricContext<Electric>()

const Chat = () => {
  const [electric, setElectric] = useState<Electric>()

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      const config = {
        debug: import.meta.env.DEV,
        url: import.meta.env.ELECTRIC_SERVICE
      }

      const {tabId} = uniqueTabId()
      const scopedDbName = `basic-${LIB_VERSION}-${tabId}.db`

      const conn = await ElectricDatabase.init(scopedDbName)
      const electric = await electrify(conn, schema, config)
      await electric.connect(authToken())

      if (!isMounted) {
        return
      }

      setElectric(electric)
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  if (electric === undefined) {
    return null
  }

  return (
    <ElectricProvider db={electric}>
      <ChatComponent />
    </ElectricProvider>
  )
}

const ChatComponent = () => {
  const {db} = useElectric()!
  const {results} = useLiveQuery(db.messages.liveMany())
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
        <p key={message.id} className='message'>
          <div>{`${message.user_id}: ${message.text}`}</div>
        </p>
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

export {Chat}
