// fast api
import 'reflect-metadata'
export { FastApi } from './server/fast-api'
export {
  Raw,
  Any, Get, Post, Put, Options, Del, Patch, Head,
  Aborted,
  ServeStatic,
} from './server/rest/routes'
export {
  Rest
} from './server/rest/rest'
export {
  Validate
} from './server/rest/validator'
// re-export the bodyParser for the Raw method
export {
  bodyParser,
  getWriter,
  getContentType,
  lookupStatus
} from '@velocejs/server/src'
