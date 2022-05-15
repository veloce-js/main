import test from 'ava'
import WebSocketClient from 'ws'
import { WebsocketServer } from './fixtures/socket-server'
import { arrayBufferToString } from '@velocejs/server'

let api: WebsocketServer
let url: string
let client: WebSocketClient

test.before(async () => {

  api = new WebsocketServer()
  url = await api.$start()
  client = new WebSocketClient(url.replace('http', 'ws'))

})

test.after(() => {
  api.$stop()
})


test(`Testing the basic websocket rouote`, async t => {
  t.plan(1)
  return new Promise((resolver) => {
    client.on('open', function(msg: ArrayBuffer) {
      const m = arrayBufferToString(msg)
      t.is(m, 'Hello')
      resolver()
    })
  })
})
