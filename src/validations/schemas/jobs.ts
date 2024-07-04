import { ErrorMessages } from "@constants/error_constants"

export const saveJobs = {
    type: "object",
    properties: {
        templateUid: {type: "string", errorMessage: "template Uid should not be empty"},
        description: { type:"string", pattern: "^[^\\s].*$", errorMessage: "description should not be empty" },
        tools: { 
            type: "array", 
            minItems: 1, 
            items: {
                type: "object",
                properties: {
                    id: { type: "number", minimum: 0, errorMessage: "tool id should be a number" },
                    name: { type: "string", pattern: "^[^\\s].*$", errorMessage: "tool name should not be empty" }
                },
                required: ["id", "name"],
                additionalProperties: false,
                errorMessage: {
                    required: {
                        id: "tool id should be provided",
                        name: "tool name should not be empty"
                    }
                }
            },
            errorMessage: {
                minItems: "tools should not be empty",
                type: "tools should be an array of objects"
            }
        },
        skills: { 
            type: "array", 
            minItems: 1, 
            items: {
                type: "object",
                properties: {
                    id: { type: "number", minimum: 0, errorMessage: "skill id should be a number" },
                    name: { type: "string", pattern: "^[^\\s].*$", errorMessage: "skill name should not be empty" }
                },
                required: ["id", "name"],
                additionalProperties: false,
                errorMessage: {
                    required: {
                        id: "skill id should be provided",
                        name: "skill name should not be empty"
                    }
                }
            },
            errorMessage: {
                minItems: "skills should not be empty",
                type: "skills should be an array of objects"
            }
        },
        employmentType: {type: "object", properties:{
            id: {type: "number", errorMessage: "id should be number"},
            name: {type: "string", pattern: "^[^\\s].*$", errorMessage:"name should not be number"}
        },
        required:["id","name"],
        additionalProperties: false},
        jobType:  {type: "object", properties:{
            id: {type: "number", errorMessage: "id should be number"},
            name: {type: "string", pattern: "^[^\\s].*$", errorMessage:"name should not be number"}
        },
        required:["id","name"],
        additionalProperties: false},
        shifts:  {type: "object", properties:{
            id: {type: "number", errorMessage: "id should be number"},
            name: {type: "string", pattern: "^[^\\s].*$", errorMessage:"name should not be number"}
        },
        required:["id","name"],
        additionalProperties: false},
        interview: { 
            type: "array", 
            minItems: 1, 
            items: {
                type: "object",
                properties: {
                    id: { type: "number", errorMessage: "interview id should be a number" },
                    name: { type: "string", pattern: "^[^\\s].*$", errorMessage: "interview name should not be empty" }
                },
                required: ["id", "name"],
                additionalProperties: false,
                errorMessage: {
                    required: {
                        id: "interview id should be provided",
                        name: "interview name should not be empty"
                    }
                }
            },
            errorMessage: {
                minItems: "interview should not be empty",
                type: "interview should be an array of objects"
            }
        },
        jobSummary: { type: "string", pattern: "^[^\\s].*$", errorMessage: "job summary should not be empty"},
        preferredSkills: {type: "string", pattern: "^[^\\s].*$", errorMessage: "preferred skills should not be empty"},
        aboutCompany: {type: "string", pattern: "^[^\\s].*$", errorMessage: "about company should not be empty"},
        education: { type: "string", pattern: "^[^\\s].*$", errorMessage: "education should not be empty"},
        location: {type: "string", pattern: "^[^\\s].*$", errorMessage: "location should not be empty"},
        noOfOpenings: {type: "number", minimum: 0, errorMessage: "no of openings should not be empty"},
        salary: {type: "number",  minimum: 0, errorMessage: "salary should be number"},
        experience: {type: "number", minimum: 0, errorMessage: "experience should be number"},
        jobValidUpto: { type: "number", minimum: 0, errorMessage: "job valid upto should be number"},
        requirements: {type: "string", pattern: "^[^\\s].*$", errorMessage:"requirements should not be empty"}

    },
     required: [ "description", "tools", "skills", "employmentType", "shifts", "interview", "jobSummary", "preferredSkills", "aboutCompany", "education", "location", "noOfOpenings", "salary", "experience", "requirements"],
     additionalProperties: false
 
}
export const getJobs = {
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
        isActionableJobs: {
            type: "string",
            enum: ["true","false"],
            errorMessage: "is actionable job should be true or false"
        },
        categoryId:{
            type: "number",
            minimum: 0,
            errorMessage: "category id must be number"
        },
        location:{
            type: "string",
            ErrorMessage: "location should not be empty"
        },
        jobTYpeIds:{ 
            type: "number",
            minimum: 0,
            ErrorMessage: "job type id should not empty"
        },
        employmentTypeIds:{ 
            type: "number",
            minimum: 0,
            ErrorMessage: "job type id should not empty"
        }


    },
    
 
}
export const jobUid= {
    type: "object",
    properties:{
        jobUid: {type: "string", pattern: "^[^\\s].*$", errorMessage: "jobUid should not be empty"}
    },
    required: ["jobUid"],
    additionalProperties: false
}
export const updateJob = {
    type: "object",
    properties: {
        ...saveJobs.properties, 
        ...jobUid.properties
    },
    required: [ ...saveJobs.required,...jobUid.required],
    additionalProperties: false
}
export const updateJobStatus = {
    type: "object",
    properties:{
        ...jobUid.properties,
        status: {  type: "string",
            enum: ["ON_HOLD","ACTIVE","INACTIVE"],
            errorMessage: "status should be ON_HOLD, ACTIVE, INACTIVE"}
    },
    required:[...jobUid.required,"status"],
    additionalProperties: false
}