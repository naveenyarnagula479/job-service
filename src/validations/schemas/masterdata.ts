export const masterDataTypes = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1, errorMessage: "name field should not be empty" }
    },
    required: ["name"],
    additionalProperties: false
}

export const nameWithCategorySchema = {
    type : "object",
    properties: {
        categoryId: { type : "number", minimum: 1, errorMessage: "category id should not be empty" },
        name: { type: "string", minLength: 1, errorMessage: "name should not be empty" }
    },
    required: ["categoryId", "name"],
    additionalProperties: false
}

export const courseCategory = {
    type: "object",
    properties: {
        programId: { type: "number", minLength: 1, errorMessage: "program id should not be empty" },
        name: { type: "string", minLength: 1, errorMessage: "course category name should not be empty" },
        description: { type: "string", minLength: 1, errorMessage: "description should not be empty" },
    },
    required: ["programId", "name", "description"],
    additionalProperties: false
}

export const courseCategoryId = {
    type: "object",
    properties: {
        categoryId: { type: "string", minLength: 1, errorMessage: "course category id should not be empty" }
    },
    required: ["categoryId"],
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

export const employmentTypeUid = {
    type: "object",
    properties: {
        employmentTypeUid: { type: "string", pattern: "^[^\\s].*$", errorMessage: "employment type Uid should not be empty" }
    },
    required: ["employmentTypeUid"],
    additionalProperties: false
}

export const jobShiftUid = {
    type: "object",
    properties: {
        jobShiftUid: { type: "string", pattern: "^[^\\s].*$", errorMessage: "job shift Uid should not be empty" }
    },
    required: ["jobShiftUid"],
    additionalProperties: false
}

export const skillsUid = {
    type: "object",
    properties: {
        skillUid: { type: "string", pattern: "^[^\\s].*$", errorMessage: "skill Uid should not be empty" }
    },
    required: ["skillUid"],
    additionalProperties: false
}

export const toolsUid = {
    type: "object",
    properties: {
        toolUid: { type: "string", pattern: "^[^\\s].*$", errorMessage: "tool Uid should not be empty" }
    },
    required: ["toolUid"],
    additionalProperties: false
}

export const interviewRoundsUid = {
    type: "object",
    properties: {
        interviewRoundUid: { type: "string", pattern: "^[^\\s].*$", errorMessage: "interview round Uid should not be empty" }
    },
    required: ["interviewRoundUid"],
    additionalProperties: false
}

export const list = {
    type: "object",
    properties: {
      pageNum: {
        type: "string",
        minimum: 0,
        pattern: "^[0-9]*$",
        errorMessage: "page number should be number"
      },
      pageSize: {
        type: "string",
        minimum: 0,
        pattern: "^[0-9]*$",
        errorMessage: "page size should be number"
      },
      searchText: {
        type: "string",
        minLength: 0,
        maxLength: 10,
        pattern: "^[\\w\\s]*$",
        errorMessage: "Search text must be between 2 to 10 characters"
      },
      queryId: {
        type: "number",
        minimum: 0,
        errorMessage: "query Id should be number"
      },
      sortOrder: {
        type: "string",
        enum: ["asc", "desc"],
        errorMessage: "sort order must be 'asc' or 'desc' "
      },
      status : {
        type : "string"
      }
    },
    required: [],
    additionalProperties: false
  }





export const updateJobType = {
    ...jobTypeUid, ...masterDataTypes,
    properties: {
        ...jobTypeUid.properties, ...masterDataTypes.properties
    },
    required: [...jobTypeUid.required, ...masterDataTypes.required],
    additionalProperties: false
}



export const updateEmploymentType = {
    ...employmentTypeUid, ...masterDataTypes,
    properties: {
        ...employmentTypeUid.properties, ...masterDataTypes.properties
    },
    required: [...employmentTypeUid.required, ...masterDataTypes.required],
    additionalProperties: false
}




export const updateJobShifts = {
    ...jobShiftUid, ...masterDataTypes,
    properties: {
        ...jobShiftUid.properties, ...masterDataTypes.properties
    },
    required: [...jobShiftUid.required, ...masterDataTypes.required],
    additionalProperties: false
}

export const updateCourseCategory = {
    ...courseCategoryId, ...courseCategory,
    properties: {
        ...courseCategoryId.properties, ...courseCategory.properties
    },
    required: [...courseCategoryId.required, ...courseCategory.required],
    additionalProperties: false
}

export const updateSkill = {
    ...skillsUid, ...nameWithCategorySchema,
    properties: {
        ...skillsUid.properties,
        ...nameWithCategorySchema.properties

    },
    required: [...skillsUid.required, ...nameWithCategorySchema.required],
    additionalProperties: false
}


export const updateTools = {
    ...toolsUid, ...nameWithCategorySchema,
    properties: {
        ...toolsUid.properties,
        ...nameWithCategorySchema.properties

    },
    required: [...toolsUid.required, ...nameWithCategorySchema.required],
    additionalProperties: false
}

export const updateInterviewRound = {
    ...interviewRoundsUid, ...nameWithCategorySchema,
    properties: {
        ...interviewRoundsUid.properties,
        ...nameWithCategorySchema.properties

    },
    required: [...interviewRoundsUid.required, ...nameWithCategorySchema.required],
    additionalProperties: false
}