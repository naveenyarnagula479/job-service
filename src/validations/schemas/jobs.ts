import { error } from "console"


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
    }
export const saveJobs = {
    type: "object",
    properties: {
        categoryId:{type: "number", minimum: 0, pattern:"^[0-9]*$", errorMessage: "category id should be number"},
        categoryName:{ type:"string", minLength: 1,errorMessage:"course category name should not be empty"},
        programId:{ type: "number", minimum: 0, errorMessage:"program id should be number"},
        templateUid:{ type:"string", errorMessage:"template  uid should be string"},
        jobTitle:{ type:"string", minLength: 1, errorMessage:"job title should be string"},
        description: { type:"string", minLength:1, errorMessage:"description should be string"},
        tools:list,
        skills:list,
        employmentType: object,
        jobType: object,
        shifts: object,
        interview:list,
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
        },
        isDeleted: {type: "boolean", default:false},
        createdBy:{type:"number", minimum:0, errorMessage:"created by should be number"},
        createdAt: {type:"string", format:"date-time"},
        updatedBy:{type:["number","null"], minimum:0, errorMessage:"updated by should be number"},
        updatedAt: {type:["string","null"], format:"date-time"},
        v:{type:"number",}
    },
    required: ['categoryId','categoryName','programId','templateUid','jobTitle', 'description', 'tools', 'skills','employmentType', 'interview', 'requirements', 'jobSummary', 'preferredSkills','aboutCompany','education','jobValidUpto','location','noOfOpenings','salary','salaryType','experience','isDeleted','createdBy','createdAt','updatedBy','updatedAt','v'],
    additonalProperties: true
}
export const jobUid = {
    type:"object",
    properties:{
        jobUid:{type:"string", errorMessage:"job Uid should not be empty"}
    },
    required: ['jobUid'],
    additionalProperties: false
}
export const updateJobs={
    ...jobUid,...saveJobs,
    properties:{
        recruiterUid:{type:"string", errorMessage:"recruiter Uid should not be empty"},
        recruiterId:{ type: "number", errorMessage: 'recruiter id should be number'},
        previousStatus: { type: "string", enum:['DRAFTED','PENDING','ON_HOLD'], errorMessage: 'previousStatus should be DRAFTED OR PENDING OR ON_HOLD'},
        jobStatus:{type: "string", enum:['ON_HOLD', 'DRAFTED'], errorMessage: 'job status should be ON_HOLD, DRAFTED' },
        isRerequest:{ type: "boolean", default: false},
        requestedOn: { type: "string",  format:"date-time"},
        ...jobUid.properties, ...saveJobs.properties
    },
    required:[...jobUid.required,...saveJobs.required,'recruiterUid','recruiterId', 'previousStatus','jobStatus','isRerequest','requestedOn'],
    additionalProperties:false
}

export const studentUid = {
     type:"object",
     properties:{
        studentUid:{  type: "string", errorMessage:"student uid should not be empty"
        }
       
     },
     required:['studentUid']
}
export const jobStatus = {
    type:"object",
    properties:{
        status:{ type:"string",enum: ['ACTIVE','INACTIVE','ON_HOLD', 'DRAFTED','PENDING','EXPIRED','IN_PROGRESS'],errorMessage:"status should be ACTIVE or INACTIVE OR ON_HOLD or DRAFTED or NEW_REQUEST or RE_REQUEST or PENDING or EXPIRED or SELECTED or REJECTED or IN_PROGRESS"},
        subject:{ type:"string", minLength: 1, errorMessage:"subject should not be empty"},
        description: { type:"string", minLength: 1, errorMessage:"description should not be empty"} 
    },
    required:['status','subject','description'],
    additionalProperties: false
}
export const getJobsByStudentUid={
    ...jobUid,...studentUid,
    properties:{
        ...jobUid.properties,
        ...studentUid.properties
    },
    required:[...jobUid.required,...studentUid.required]
}
export const updateStudentJobStatus = {
    ...jobUid,...studentUid,...jobStatus,
    properties:{
        ...jobUid.properties, ...studentUid.properties, ...jobStatus.properties
    },
    required:[...jobStatus.required,...jobUid.required, ...studentUid.required],
    additionalProperties: false
}
export const updateJobStatus = {
    ...jobUid,...jobStatus,
    properties:{
        ...jobUid.properties, ...jobStatus.properties
    },
    required:[...jobStatus.required,...jobUid.required],
    additionalProperties: false
}
export const saveStudentJobs = {
    ...jobUid, 
    properties:{
        isSaved: {type: "boolean", errorMessage:"isSaved is either true or false" },
        ...jobUid.properties
    },
    required:['isSaved',...jobUid.required]
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
export const candidates ={
    ...queryparams,
    properties:{
        ...queryparams.properties,
        jobRole:{type: "string", errorMessage:"job role should not empty"},
        status:{ type:"string", enum:['PENDING','SELECTED','REJECTED','IN_PROGRESS'], errorMessage:"status should be PENDING, SELECTED, REJECTED, IN_PROGRESS "}
    },
    required:[],
    additionalProperties: false
}