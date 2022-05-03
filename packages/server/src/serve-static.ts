// server static methods

import fs from 'node:fs'
import path from 'node:path'
import { HttpResponse, HttpRequest } from './types'
import { DEFAULT_FILE, CONTENT_TYPE } from './base/constants'
import { getWriter, write404 } from './writers'
import { lookup } from './base/mime'
import { isFunction, toArray } from '@jsonql/utils'
// import { toArray } from '@jsonql/utils'
// import { toArr } from '@velocejs/bodyparser/utils'
import debug from 'debug'
const debugFn = debug('velocejs:server:serve-static')

/**
 * serve static files from assetDir
 */
export function serveStatic(
  assetDir: string | string[],
  onAbortedHandler?: () => void
) {
  const dirs: Array<string> = toArray(assetDir)

  return function(res: HttpResponse, req: HttpRequest) {
    // we need to provide a onAbortedHandler here
    res.onAborted(() => {
      if (onAbortedHandler && isFunction(onAbortedHandler)) {
        onAbortedHandler() // @TODO should we pass the res ?
      } else {
        debugFn(`Serve static aborted`)
      }
    })
    let url = req.getUrl()
    if (url === '/') {
      url = DEFAULT_FILE
    }
    debugFn(url)
    const file = dirs
      .filter((dir: string) => fs.existsSync(path.join(dir, url)))
      .map((dir: string) => fs.readFileSync(path.join(dir, url)))

    if (file.length) {
      const mimeType = lookup(url)
      const writer = getWriter(res)
      writer(file[0], {[CONTENT_TYPE]: mimeType})
    } else {
      write404(res)
    }
  }
}
