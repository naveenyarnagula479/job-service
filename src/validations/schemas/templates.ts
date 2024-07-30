export const list = {
    type: "array",
    items: {
        properties: {
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
    },
    minItems: 1,
    uniqueItems: true
}

export const saveTemplates = {
    type: "object",
    properties: {
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
        employmentType: {
            type: "object",
            properties: list.items.properties,
            required: [list.items.required],
            additionalProperties: false
        },
        jobType: {
            type: "object",
            properties: list.items.properties,
            required: [list.items.required],
            additionalProperties: false
        },
        shifts: {
            type: "object",
            properties: list.items.properties,
            required: [list.items.required],
            additionalProperties: false
        },
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
    required: ['jobTitle', 'description', 'tools','skills', 'employmentType', 'jobType', 'shifts', 'interview',
        'requirements', 'jobSummary', 'preferredSkills', 'aboutCompany', 'education', 'jobValidUpto', 'location', 
        'noOfOpenings', 'salary', 'experience'],
    additionalProperties: false
}

