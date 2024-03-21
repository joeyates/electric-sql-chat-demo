import {JSX, useEffect, useState} from 'react'
import {uniqueTabId} from 'electric-sql/util'
import {LIB_VERSION} from 'electric-sql/version'
import {ElectricDatabase, electrify} from 'electric-sql/wa-sqlite'

import {authToken} from '../lib/auth'
import {useAuth} from '../contexts/AuthContext'
import ElectricContext from '../contexts/ElectricContext'
import {Electric, schema} from '../generated/client'

const Provider = ElectricContext.ElectricProvider

const ElectricProvider = ({children}: {children: JSX.Element}) => {
  const auth = useAuth()
  const [electric, setElectric] = useState<Electric>()

  useEffect(() => {
    let isMounted = true

    if (!auth.user) {
      return
    }

    const user = auth.user!

    const init = async () => {
      const config = {
        debug: import.meta.env.DEV,
        url: import.meta.env.ELECTRIC_SERVICE
      }

      const {tabId} = uniqueTabId()
      const scopedDbName = `chat-${LIB_VERSION}-${user.name}-${tabId}.db`

      const conn = await ElectricDatabase.init(scopedDbName)
      const electric = await electrify(conn, schema, config)
      const token = authToken()
      if (!token) {
        throw new Error('User not authenticated')
      }
      await electric.connect(token)

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

  if (!electric) {
    return <div>Loading...</div>
  }

  return <Provider db={electric}>{children}</Provider>
}

export default ElectricProvider
