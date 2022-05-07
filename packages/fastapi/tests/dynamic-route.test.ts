// testing the dynamic route
import test from 'ava'
import Fetch from 'node-fetch'

import { MyDynamicRoute } from './fixtures/dynamic-route-test-class'

let classInstance: MyDynamicRoute
let url: string

test.before(async () => {
  classInstance = new MyDynamicRoute()
  await classInstance.start()

  url = 'http://localhost:' + classInstance.fastApiInfo.port

})

test.after(() => {
  classInstance.stop()
})

test(`Should able to use dynamic route on GET route with correct type on method`, async t => {

  const result = await Fetch(`${url}/2022/5/7`)

  const json = await result.json()

  console.log(json)

  t.truthy(json)

})

test.todo(`Should able to use dynamic route on GET route with spread arguments`)

/*
// t.throws or t.throwsAsync not able to contain the error within and cause the test fail
test.skip(`Should throw error if dynamic route apply on non-get route`, async t => {
  t.plan(1)

  async function startWrong() {
    const obj = new MyWrongDynamicRoute()
    return await obj.start()
  }

  t.throwsAsync(async () => {
    return await startWrong()
  })
})
*/
