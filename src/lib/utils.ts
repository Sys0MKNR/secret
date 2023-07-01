// import { Buffer as BufferPolyfill } from 'buffer'
// declare var Buffer: typeof BufferPolyfill
// globalThis.Buffer = BufferPolyfill

export const shuffle = <T>(arr: Array<T>): Array<T> => {
  const newArr = [...arr]

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArr[i]
    newArr[i] = newArr[j]
    newArr[j] = temp
  }
  return newArr
}

export const rand = (max?: number, min = 0): number => {
  return Math.floor(Math.random() * max) + min
}

export const sha512 = (str: string) => {
  return crypto.subtle
    .digest('SHA-512', new TextEncoder().encode(str))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
        .join('')
    })
}

export const getKeyMaterial = (pw) => {
  let enc = new TextEncoder()
  return window.crypto.subtle.importKey(
    'raw',
    enc.encode(pw),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
}

export const getKey = (keyMaterial, salt) => {
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-512'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt']
  )
}

export const decrypt = async (pw, data) => {
  const keyMaterial = await getKeyMaterial(pw)

  const key = await getKey(keyMaterial, hexStringToArrayBuffer(data.salt))

  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: hexStringToArrayBuffer(data.iv)
    },
    key,
    hexStringToArrayBuffer(data.content + data.tag)
  )

  let dec = new TextDecoder()

  return dec.decode(decrypted)
}

export const hexStringToArrayBuffer = (hexString) => {
  hexString = hexString.replace(/^0x/, '')
  if (hexString.length % 2 != 0) {
    console.log(
      'WARNING: expecting an even number of characters in the hexString'
    )
  }
  var bad = hexString.match(/[G-Z\s]/i)
  if (bad) {
    console.log('WARNING: found non-hex characters', bad)
  }
  var pairs = hexString.match(/[\dA-F]{2}/gi)
  var integers = pairs.map(function (s) {
    return parseInt(s, 16)
  })
  var array = new Uint8Array(integers)
  return array.buffer
}
