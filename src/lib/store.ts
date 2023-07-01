import { writable } from 'svelte/store'
import { decrypt, getKey, getKeyMaterial, sha512, shuffle } from './utils'

let HASH =
  '4f5f329cfcd3dabce4761249f1fe7b6d7fa05b423a0e40424fbbab31067347762033a0b1ef6674679cc773c1cdbcb919602e63b2e51c886c8c5a1643731fbfda'

function createStore() {
  const loggedIn = writable(false)

  const statement = writable(['Question 1', 'this is a longer question.'])
  const header = writable('Header')

  let data

  return {
    subStatement: statement.subscribe,
    subHeader: header.subscribe,
    subLoggedIn: loggedIn.subscribe,
    init: async () => {
      const res = await fetch('/conf.enc.json')
      data = await res.json()

      console.log(data)
    },
    login: async (pw: string) => {
      try {
        console.log('login')
        const decryptedData = await decrypt(pw, data)

        const json = JSON.parse(decryptedData)

        console.log(json)

        statement.set(shuffle(json.statement))
        header.set(json.header)

        loggedIn.set(true)
      } catch (error) {
        console.error('login error')
        console.error(error)
      }
    }
  }
}

export const store = createStore()
