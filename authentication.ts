import express from 'express'
import {createServer} from 'vite'

console.log('Starting authentication server...')

const PORT = 4173

const app = express()

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
    const data = {params: req.body}
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
