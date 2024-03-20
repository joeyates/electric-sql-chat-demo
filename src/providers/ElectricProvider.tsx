import {JSX, useEffect, useState} from 'react'
import {uniqueTabId} from 'electric-sql/util'
import {LIB_VERSION} from 'electric-sql/version'
import {ElectricDatabase, electrify} from 'electric-sql/wa-sqlite'

import {authToken} from '../lib/auth'
import {Provider} from '../lib/electric'
import {Electric, schema} from '../generated/client'

const ElectricProvider = ({children}: {children: JSX.Element}) => {
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
