import express from 'express'
import {KJUR} from 'jsrsasign'
import {createServer} from 'vite'
import pg from 'pg'
import {config} from 'dotenv'

const AUTHENTICATION_FAILED_MESSAGE = 'Authentication failed'
const JWT_SIGNATURE_ALGORITHM = 'HS256'

config({path: ['.env.local', '.env']})

const connectionString = process.env.DATABASE_URL
const JWT_SIGNATURE_PASSWORD = process.env.JWT_SIGNATURE_PASSWORD
const PORT = process.env.AUTHENTICATION_ENDPOINT_PORT

console.log('Starting authentication server...')

const makeJWT = (user_id: string) => {
  const header = {alg: JWT_SIGNATURE_ALGORITHM, typ: 'JWT'}
  const now = KJUR.jws.IntDate.get('now')
  const expiry = KJUR.jws.IntDate.get('now + 1day')
  const payload = {
    sub: user_id,
    nbf: now,
    iat: now,
    exp: expiry
  }
  return KJUR.jws.JWS.sign(JWT_SIGNATURE_ALGORITHM, header, payload, JWT_SIGNATURE_PASSWORD)
}

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
    const result = await client.query(
      'SELECT id, password_hash from users where username = $1',
      [req.body.username]
    )
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
    const user_id = result.rows[0].id
    const data = {jwt: makeJWT(user_id)}
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
