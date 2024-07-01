export const saveMasterTemplate = {
    type: "object",
    properties: {
        jobTitle:{type:"string", pattern: "^[^\\s].*$", errorMessage: "job title should not be empty" },
        description: { type:"string", pattern: "^[^\\s].*$", errorMessage: "description should not be empty" },
        tools: { type: "array", "minItems": 1, errorMessage: "tools should not be empty"},
        skills: {type: "array", "minItems": 1,  errorMessage: "sills should not be empty"},
        employmentType: {type: "object", properties:{
            id: {type: "number", errorMessage: "id should be number"},
            name: {type: "string", pattern: "^[^\\s].*$", errorMessage:"name should not be number"}
        }},
        jobType:   {type: "object", properties:{
            id: {type: "number", errorMessage: "id should be number"},
            name: {type: "string", pattern: "^[^\\s].*$", errorMessage:"name should not be number"}
        }},
        shifts:  {type: "object", properties:{
            id: {type: "number", errorMessage: "id should be number"},
            name: {type: "string", pattern: "^[^\\s].*$", errorMessage:"name should not be number"}
        }},
        interview: {type: "array", "minItems": 1,  errorMessage: "interview should not be empty"},
        jobSummary: { type: "string", pattern: "^[^\\s].*$", errorMessage: "job summary should not be empty"},
        preferredSkills: {type: "string", pattern: "^[^\\s].*$", errorMessage: "preferred skills should not be empty"},
        aboutCompany: {type: "string", pattern: "^[^\\s].*$", errorMessage: "about company should not be empty"},
        education: { type: "string", pattern: "^[^\\s].*$", errorMessage: "education should not be empty"},
        location: {type: "string", pattern: "^[^\\s].*$", errorMessage: "location should not be empty"},
        noOfOpenings: {type: "number", pattern: "^[^\\s].*$", errorMessage: "no of openings should not be empty"},
        salary: {type: "number",  errorMessage: "salary should be number"},
        experience: {type: "number", errorMessage: "experience should be number"},
        jobValidUpto: { type: "number", errorMessage: "job valid upto should be number"}
    },
     required: ["jobTitle", "description", "tools", "skills", "employmentType", "shifts", "interview", "jobSummary", "preferredSkills", "aboutCompany", "education", "location", "noOfOpenings", "salary", "experience", "jobValidUpto"],
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