export const masterDataTypes = {
    type: "object",
    properties: {
      name: { type: "string", minLength : 2 , errorMessage : "name field should not be empty"}
    },
    required: ["name"],
    additionalProperties: false
  }

export const jobTypeUid = {
    type: "object",
    properties: {
        jobTypeUid: { type: "string", pattern: "^[^\\s].*$", errorMessage: "job type Uid should not be empty" }
    },
    required: ["jobTypeUid"],
    additionalProperties: false
}

export const employmnetTypeUid = {
    type : "object",
    properties : {
        employmnetTypeUid : {type : "string", pattern : "^[^\\s].*$", errorMessage: "employmnet type Uid should not be empty"}
    },
    required : ["employmnetTypeUid"],
    additionalProperties : false
}

export const jobShiftsUid = {
    type : "object",
    properties : {
        jobShiftsUid : {type : "string", pattern : "^[^\\s].*$", errorMessage: "job shift Uid should not be empty"}
    },
    required : ["jobShiftsUid"],
    additionalProperties : false
}