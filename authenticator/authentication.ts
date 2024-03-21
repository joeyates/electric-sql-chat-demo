import express from 'express'
import {KJUR} from 'jsrsasign'
import {createServer} from 'vite'
import pg from 'pg'
import {config} from 'dotenv'

import type {AuthenticationResponse, RegistrationResponse} from './authentication.d'

const AUTHENTICATION_FAILED_MESSAGE = 'Authentication failed'
const JWT_SIGNATURE_ALGORITHM = 'HS256'

config({path: ['.env.local', '.env']})

const DATABASE_URL = process.env.DATABASE_URL
const JWT_SIGNATURE_PASSWORD = process.env.JWT_SIGNATURE_PASSWORD
const PORT = process.env.AUTHENTICATION_ENDPOINT_PORT

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable not set')
  process.exit(1)
}

console.log('Starting authentication server...')

const makeJWT = (userId: string) => {
  const header = {alg: JWT_SIGNATURE_ALGORITHM, typ: 'JWT'}
  const now = KJUR.jws.IntDate.get('now')
  const expiry = KJUR.jws.IntDate.get('now + 1day')
  const payload = {
    sub: userId,
    nbf: now,
    iat: now,
    exp: expiry
  }
  return KJUR.jws.JWS.sign(
    JWT_SIGNATURE_ALGORITHM,
    header,
    payload,
    JWT_SIGNATURE_PASSWORD
  )
}

const app = express()
const client = new pg.Client({connectionString: DATABASE_URL})
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
    const response = JSON.stringify({error: 'No username supplied'})
    res.status(400).end(response)
    return
  }
  if (!req.body.password) {
    const response = JSON.stringify({error: 'No password supplied'})
    res.status(400).end(response)
    return
  }
  try {
    const username = req.body.username
    // Pretend we're hashing the password here
    // Hash the password whether the username exists or not to protect against timing attacks.
    const passwordHash = req.body.password
    const result = await client.query(
      'SELECT id, password_hash from users where username = $1',
      [username]
    )
    if (result.rows.length === 0) {
      // Sleep for a random amount of time to protect against timing attacks.
      setTimeout(() => {
        const response = JSON.stringify({error: AUTHENTICATION_FAILED_MESSAGE})
        res.status(401).end(response)
      }, Math.random() * 10)
      return
    }
    if (result.rows[0].password_hash !== passwordHash) {
      const response = JSON.stringify({error: AUTHENTICATION_FAILED_MESSAGE})
      res.status(401).end(response)
      return
    }
    const userId = result.rows[0].id
    const data: AuthenticationResponse = {
      jwt: makeJWT(userId),
      user: {id: userId, name: username}
    }
    const json = JSON.stringify({data})
    res.status(200).end(json)
  } catch (error) {
    const message = JSON.stringify({error: (error as Error).message})
    res.status(500).end(message)
  }
})

app.post('/api/register', async (req, res) => {
  res.set({'Content-Type': 'application/json'})
  try {
    const username = req.body.username
    // Pretend we're hashing the password here
    const passwordHash = req.body.password
    const result = await client.query(
      'INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *',
      [username, passwordHash]
    )
    if (result.rows.length === 0) {
      const response = JSON.stringify({error: 'User creation failed, please try again'})
      res.status(401).end(response)
      return
    }
    const userId = result.rows[0].id
    const data: RegistrationResponse = {
      user: {id: userId, name: username}
    }
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
