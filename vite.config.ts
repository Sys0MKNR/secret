import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import { pbkdf2Sync, randomBytes, createCipheriv } from 'crypto'

import { readFileSync, writeFileSync, statSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseConfig = {
    plugins: [svelte()]
  }

  encryptConfig()

  return {
    ...baseConfig
  }
})

function encryptConfig() {
  const CONF_FILE = './conf.json'
  const CONF_FILE_ENC = './public/conf.enc.json'

  try {
    const confStats = statSync(CONF_FILE)
    const confEncStats = statSync('./conf.enc.json')

    if (confStats.mtime < confEncStats.mtime) {
      console.log('no change detected in conf file')
      return
    }
  } catch (error) {}

  const conf = JSON.parse(readFileSync(CONF_FILE).toString())

  const hashAlgo = 'sha512'
  const encAlgo = 'aes-256-gcm'

  const salt = randomBytes(16)
  const key = pbkdf2Sync(conf.pw, salt, 100000, 32, hashAlgo)

  const iv = randomBytes(12)

  const dataToEncrypt = JSON.stringify(conf.data)

  const cipher = createCipheriv(encAlgo, key, iv)
  let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag()

  const data = {
    salt: salt.toString('hex'),
    iv: iv.toString('hex'),
    content: encrypted,
    tag: tag.toString('hex')
  }

  writeFileSync(CONF_FILE_ENC, JSON.stringify(data))
}
