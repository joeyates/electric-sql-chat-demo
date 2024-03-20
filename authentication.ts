import express from 'express'
import {createServer} from 'vite'
import pg from 'pg'
import {config} from 'dotenv'

const PORT = 4173
const AUTHENTICATION_FAILED_MESSAGE = 'Authentication failed'

config({path: ['.env.local', '.env']})

console.log('Starting authentication server...')

const connectionString = process.env.DATABASE_URL

const app = express()
const client = new pg.Client({connectionString})
await client.connect()

const vite = await createServer({
  server: {middlewareMode: true},
  appType: 'custom'
})

app.use(vite.middlewares)
app.use(express.json())

app.post('/api/authenticate', async (req, res) => {
  res.set({'Content-Type': 'application/json'})
  if (!req.body.username) {
    res.status(400).end('No username supplied')
    return
  }
  if (!req.body.password) {
    res.status(400).end('No password supplied')
    return
  }
  try {
    // Pretend we're hashing the password here
    // Hash the password whether the username exists or not to protect against timing attacks.
    const passwordHash = req.body.password
    const result = await client.query('SELECT password_hash from users where username = $1', [req.body.username])
    if (result.rows.length === 0) {
      // TODO: Sleep for a random amount of time to protect against timing attacks.
      const response = JSON.stringify({error: AUTHENTICATION_FAILED_MESSAGE})
      res.status(401).end(response)
      return
    }
    if (result.rows[0].password_hash !== passwordHash) {
      const response = JSON.stringify({error: AUTHENTICATION_FAILED_MESSAGE})
      res.status(401).end(response)
      return
    }
    const data = {jwt: "fake-jwt"}
    const json = JSON.stringify({data})
    res.status(200).end(json)
  } catch (error) {
    const message = JSON.stringify({error: (error as Error).message})
    res.status(500).end(message)
  }
})

app.listen(PORT, () => {
  console.log(`Authentication server listening at http://localhost:${PORT}.`)
})
