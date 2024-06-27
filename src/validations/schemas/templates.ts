export const saveMasterTemplate = {
    type: "object",
    properties: {
        jobTitle:{type:"string", pattern: "^[^\\s].*$", errorMessage: "job title should not be empty" },
        description: { type:"string", pattern: "^[^\\s].*$", errorMessage: "description should not be empty" },
        tools: { type: "array", "minItems": 1, errorMessage: "tools should not be empty"},
        skills: {type: "array", "minItems": 1,  errorMessage: "sills should not be empty"},
        employmentType: {type: "array", "minItems": 1,  errorMessage: "employment should not be empty"},
        jobType:  {type: "array", "minItems": 1,  errorMessage: "job type should not be empty"},
        shifts: { type: "array", "minItems": 1,  errorMessage: "shifts should not be empty"},
        interview: {type: "array", "minItems": 1,  errorMessage: "interview should not be empty"},
        jobSummary: { type: "string", pattern: "^[^\\s].*$", errorMessage: "job summary should not be empty"},
        preferredSkills: {type: "string", pattern: "^[^\\s].*$", errorMessage: "preferred skills should not be empty"},
        aboutCompany: {type: "string", pattern: "^[^\\s].*$", errorMessage: "about company should not be empty"},
        education: { type: "string", pattern: "^[^\\s].*$", errorMessage: "education should not be empty"},
        jobStartDate: {  type: "string", format: "date", errorMessage: "Please enter startDate as valid date format (YYYY-MM-DD)"},
        jobEndDate: { type: "string", format: "date", errorMessage: "Please enter endDate as valid date format (YYYY-MM-DD)"},
        location: {type: "string", pattern: "^[^\\s].*$", errorMessage: "location should not be empty"},
        noOfOpenings: {type: "number", pattern: "^[^\\s].*$", errorMessage: "no of openings should not be empty"},
        salary: {type: "string", pattern: "^[^\\s].*$", errorMessage: "salary should not be empty"},
        experience: {type: "string", pattern: "^[^\\s].*$", errorMessage: "experience should not be empty"}
    },
     required: ["jobTitle", "description", "tools", "skills", "employmentType", "shifts", "interview", "jobSummary", "preferredSkills", "aboutCompany", "education", "jobStartDate", "jobEndDate", "location", "noOfOpenings", "salary", "experience"],
     additionalProperties: false
 
}

export const saveTemplates = {
    type: "object",
    properties:{
    categoryId: {type: "number" , errorMessage: "category id should be number"},
    ...saveMasterTemplate.properties

    },
    required: ["categoryId", ...saveMasterTemplate.required],
    additionalProperties: false
}
export const getTemplates = {
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
        categoryId: {
            type: "number",
            minimum: 0,
            errorMessage: "category id  should be number"
        }
    },
    required: ["categoryId" ],
    additionalProperties: false
}
export const templateUid = {
    type: "object",
    properties: {
        templateUid: { type: "string", pattern: "^[^\\s].*$", errorMessage:"template uid should not be empty"},
    },
    required: ["templateUid"]
}
export const updateTemplates = {
    ...templateUid, ...saveTemplates,
    properties: {
        ...templateUid.properties,
        ...saveTemplates.properties
    },
    required: [...templateUid.required, ...saveTemplates.required],
    additionalProperties: false
}