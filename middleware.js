import puppeteer from 'puppeteer'

export async function loadURL (url) {
  let browser
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 })
    const html = await page.content()
    return html
  } finally {
    await browser.close()
  }
}