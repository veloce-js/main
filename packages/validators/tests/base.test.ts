import test from 'ava'
import MultiApi from './fixtures/multi-api'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { Validators } from '../src'
import { JsonqlValidationError } from '@jsonql/errrors'

let api: MultiApi
let validators: Validators
test.before(() => {
  const astMap = readJsonSync(join(__dirname, 'fixtures', 'multi-api-map.json'))

  api = new MultiApi()
  validators = new Validators(astMap)
})


test(`Should able to get a validator but name and pass the validation`, async t => {
  t.plan(2)

  const V = validators.getValidator('archive')

  return V.validate([1])
      .then((result: Array<number>) => {
        t.deepEqual(result, [1])
        const txt = Reflect.apply(api.archive, api, result)
        t.is(txt, 'Return with no.1')
      })
})

test(`Should able to use addAdditonalRules`, async t => {
  t.plan(2)
  const V1 = validators.getValidator('posts')

  V1.addValidationRules({
    arg1: {
      plugin: 'lessThan', num: 2
    }
  })
  // confirm this works too
  V1.addValidationRules({arg2: {
    plugin: 'moreThan', num: 101
  }})

  const schema = validators.export()

  t.truthy(schema)

  // console.dir(schema, {depth: null})

  return V1.validate(['A', 100])
            .then((result: Array<string | number>) => {
                t.deepEqual(result, ['A', 100])
            })
            .catch((error: JsonqlValidationError) => {

              t.deepEqual(error.detail, [1,1], 'Catch error in the added rule')
            })

})
