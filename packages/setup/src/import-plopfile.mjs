// dynamically import more plopfiles
import glob from 'glob'
import { getConfigProp } from './get-config-prop.mjs'
/**
 * @param {string} pathToFiles where to search
 * @return {Array<unknown>} list of functions
 */
export async function findPlopfile (pathToFiles, options = {}) {
  return new Promise((resolve, reject) => {
    // @TODO should we clean that pathToFiles via dirname
    glob(`${pathToFiles}/*.js`, options, function (er, files) {
      if (er) {
        return reject(er)
      }
      if (!files.length) {
        // nothing to import
        resolve(false)
      }
      resolve(
        Promise.all(
          files.map(file => import(file))
        )
      )
    })
  })
}

// run everything together
export async function importPlopfile (projectRoot, plop) {
  return getConfigProp(projectRoot)
    .then(opt => {
      if (opt && opt.plopfileDir) {
        findPlopfile(opt.plopfileDir)
          .then(result => {
            if (result) {
              result.forEach(file => {
                if (typeof file.default === 'function') {
                  Reflect.apply(file.default, null, [plop])
                }
              })
            }
          })
      }
    })
}
