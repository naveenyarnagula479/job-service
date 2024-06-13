import logger from '../logger'

const {
  forEach,
  camelCase,
  isPlainObject,
  isArray,
  isString
} = require('lodash')

function formCamelCaseForArray(data) {
  return data.map((item) => {
    if (isString(item)) {
      return item
    } else {
      return toCamelCase(item)
    }
  })
}

export function toCamelCase(object) {
 // logger.debug('toCamelCase(object)::' + nodeUtil.inspect(object))
  const camelCaseObject = {}
  try {
    if (Array.isArray(object)) {
      return formCamelCaseForArray(object)
    } else if (!isNaN(object)) {
      return object
    }
    forEach(object, (value, key, i) => {
      if (isPlainObject(value)) {
        value = toCamelCase(value)
      } else if (isArray(value)) {
        value = formCamelCaseForArray(value)
      }
      camelCaseObject[camelCase(key)] = value
    })
    return camelCaseObject
  } catch (err) {
    logger.error('ERROR in toCamelCase()', err)
    return object
  }
}
