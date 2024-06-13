import { HttpStatusCodes } from '@constants/status_codes'
import { AppError } from '@models'
import Ajv, { ErrorObject, ValidateFunction } from 'ajv'
import addFormats from "ajv-formats"
import { NextFunction } from 'express'
const ajValidator = new Ajv({ allErrors: true, strict: false })
require("ajv-errors")(ajValidator /*, {singleError: true} */)


addFormats(ajValidator)

export function compile(modelSchema: any): ValidateFunction {
  return ajValidator.compile(modelSchema);
}



async function parseErrors(validationErrors?: ErrorObject[] | null | undefined) {
  const errors: any[] = [];
  validationErrors?.forEach(error => {
    errors.push({
      target: error.instancePath ? error.instancePath.substring(1) : 'NA',
      message: error.message
      //  code: 400
    });
  });

  return errors;
}

export async function processErrors(req: any, validator: ValidateFunction, next: NextFunction) {
  let body = Object.assign({}, req.params, req.query)
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    body = Object.assign(body, req.body)
  }
  const result = validator(body);
  if (!result) {
    // logger.debug(nodeUtil.inspect(validator.errors))
    const errors = await parseErrors(validator.errors);
    next(new AppError("Validation failed", HttpStatusCodes.BAD_REQUEST, errors));
  } else {
    next();
  }


}