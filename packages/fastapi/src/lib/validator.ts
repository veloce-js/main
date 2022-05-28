// wrap the @jsonql/validator here
import type {
  ValidatorsInstance,
  JsonqlValidationRule,
  ArgsListType,
} from '../types'
import {
  RULES_KEY,
  RULE_AUTOMATIC
} from './constants'
import { VeloceError } from '../lib/errors'
import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:lib:validator')

/** get the validator for the propertyName and add extra rules here */
export function createValidator(
  propertyName: string,
  argsList: Array<ArgsListType>,
  vObj: ValidatorsInstance,
  validationInput: JsonqlValidationRule,
) {
  debug('createValidator input -->', validationInput)
  assertValidationInput(propertyName, argsList, validationInput)

  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    debug('addValidationRules', validationInput[RULES_KEY])
    vObj.addValidationRules(validationInput[RULES_KEY])
  }
  // if we return it directly then it won't run
  return async (values: Array<unknown>) => vObj.validate(values)
}

/** validate aginst the dev input first */
function assertValidationInput(
    propertyName: string,
    argsList: Array<ArgsListType>,
    validationInput: JsonqlValidationRule
  ): void {
  // silly mistake
  if (!argsList.length) {
    throw new VeloceError(`${propertyName} has no parameters and therefore can not apply validation!`)
  }
  // check the name matches
  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    const names: string[] = []
    for (const name in validationInput[RULES_KEY]) {
      names.push(name)
    }
    const wrongName = argsList.filter(arg => !names.includes(arg.name))
    if (wrongName.length) {
      throw new VeloceError(
        `${propertyName}: Some of your validation argument name is wrong!
        ${names.join(',')} NOT IN ${wrongName.map(w => w.name).join(',')}`
      )
    }
  }
}
