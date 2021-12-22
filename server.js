import express from 'express'
import urlencode from 'urlencode'
import { loadURL } from './middleware'

function init () {
  const app = express()

  app.get('/', (req, res, next) => {
    const url = req.query.url
      ? urlencode.decode(req.query.url)
      : `${req.protocol}://${req.hostname}${req.url}`
    loadURL(url).then(html => {
      res.send(html)
    }).catch(next)
  })

  app.use((err, req, res, next) => { // ERROR HANDLING
    res.send(err.toString())
  })
  return app
}

try {
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  const app = init()
  app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`frodo do magic on ${host}:${port}`)
  })
} catch (err) {
  console.error(err)
}
