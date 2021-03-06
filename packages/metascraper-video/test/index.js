'use strict'

const clearModule = require('clear-module')
const snapshot = require('snap-shot')
const { promisify } = require('util')
const { resolve } = require('path')
const fs = require('fs')

const readFile = promisify(fs.readFile)

let metascraper

describe('metascraper-video', () => {
  before(() => {
    clearModule.all()
    process.env.METASCRAPER_CWD = __dirname
    metascraper = require('metascraper')
  })

  after(() => {
    clearModule.all()
    delete process.env.METASCRAPER_CWD
  })

  describe('video', () => {
    it('video src', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/video-src.html'))
      const url = 'https://www.theverge.com/2018/1/22/16921092/pentagon-secret-nuclear-bunker-reconstruction-minecraft-cns-miis-model'

      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })

    it('source src', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/source-src.html'))
      const url = 'https://9gag.com/gag/aGjVLDK'

      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })

    it('og:video', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/tweet.html'))
      const url = 'https://twitter.com/_developit/status/955905369242513414'

      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })
  })

  describe('image', () => {
    it('src:poster', async () => {
      const html = await readFile(resolve(__dirname, 'fixtures/source-poster.html'))
      const url = 'https://gfycat.com/gifs/detail/timelyhealthyarmadillo'
      const metadata = await metascraper({ html, url })
      snapshot(metadata)
    })
  })
})
