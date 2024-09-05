export const list = {
    type: "array",
    items: {
        properties: {
            id: {
                type: "string",
                errorMessage: " id should not empty",
            },
            name: {
                type: "string",
                errorMessage: "name should not be empty",
            }
        },
        required: ['id', 'name'],
        additionalProperties: false,
    },
    minItems: 1,
    uniqueItems: true
}
export const object = {
    type: "object",
    properties:{
        id: {
            type: "number",
            errorMessage: " id should not empty",
        },
        name: {
            type: "string",
            errorMessage: "name should not be empty",
        }
    },
    required: ['id', 'name'],
    additionalProperties: false,
    }
    export const queryparams = {
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
          sortBy: {
            type: "number",
            minimum: 0,
            errorMessage: "sort by should be number"
          },
          sortOrder: {
            type: "string",
            enum: ["asc", "desc"],
            errorMessage: "sort order must be 'asc' or 'desc' "
          },
        },
        required: [],
        additionalProperties: false
      }
      

export const saveTemplates = {
    type: "object",
    properties: {
        categoryId:{
            type: "number", minimum: 1, errorMessage:"category id should be number"
        },
        jobTitle: {
            type: "string",
            minLength: 1,
            errorMessage: "jobTitle should not be empty"
        },
        description: {
            type: "string",
            minLength: 1,
            errorMessage: "description should not be empty"
        },
        tools: list,
        skills: list,
        interview: list,
        employmentType: object,
        jobType: object,
        shifts:object,
        requirements: {
            type: "string",
            minLength: 1,
            errorMessage: "requirements should not be empty",
        },
        jobSummary: {
            type: "string",
            minLength: 1,
            errorMessage: "jobSummary should not be empty"
        },
        preferredSkills: {
            type: "string",
            minLength: 1,
            errorMessage: "preferred skills should not be empty",
        },
        aboutCompany: {
            type: "string",
            minLength: 1,
            errorMessage: "about company should not be empty",
        },
        education: {
            type: "string",
            minLength: 1,
            errorMessage: "education should not be empty",
        },
        jobValidUpto: {
            type: "number",
            errorMessage: "job validtity should not be empty",
        },
        location: {
            type: "string",
            minLength: 1,
            errorMessage: "location should not be empty",
        },
        noOfOpenings: {
            type: "number",
            errorMessage: "number of openings should not be empty"
        },
        salary: {
            type: "number",
            errorMessage: "salary should not be empty",
        },
        salaryType: {
            type: "string",
            errorMessage: "salary type should not be empty",
        },
        experience: {
            type: "number",
            errorMessage: "experience should not be empty"
        }
    },
    required: ['categoryId','jobTitle', 'description', 'tools','skills', 'employmentType', 'jobType', 'shifts', 'interview',
        'requirements', 'jobSummary', 'preferredSkills', 'aboutCompany', 'education', 'jobValidUpto', 'location', 
        'noOfOpenings', 'salary', 'experience'],
    additionalProperties: false
}
export const getTemplates = {
    ...queryparams,
    properties:{
        categoryId:{
            type: "string", minimum: 1, errorMessage:"category id should be number"
        },
        ...queryparams.properties
    },
    required:[],
    additionalProperties:false
}
export const templateUid ={
    type:"object",
    properties:{
        templateUid:{type:"string", errorMessage:"template uid should be string"}
    },
    required:['templateUid'],
    additionalProperties: false
}
export const updateTemplates= {
    ...saveTemplates,...templateUid,
    properties:{
        ...saveTemplates.properties,
        ...templateUid.properties
    },
    required:[...saveTemplates.required,...templateUid.required],
    additionalProperties: false
}