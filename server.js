import express from 'express'
import urlencode from 'urlencode'
import puppeteer from 'puppeteer'

async function init (host, port) {
  const app = express()

  app.get('/', async (req, res, next) => {
    const url = urlencode.decode(req.query.url)
    let browser
    try {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
      const page = await browser.newPage()
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 4000 })
      const html = await page.content()
      res.send(html)
    } catch (err) {
      next(err)
    } finally {
      await browser.close()
    }
  })

  app.use((err, req, res, next) => { // ERROR HANDLING
    res.send(err.toString())
  })
  app.listen(port, host, (err) => {
    if (err) throw err
    console.log(`frodo do magic on ${host}:${port}`)
  })
}

try {
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT
  init(host, port)
} catch (err) {
  console.error(err)
}
