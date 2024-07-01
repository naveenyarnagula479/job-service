
import { AuditInfo, IAuditInfo } from "./audit_info";
import { IBaseRecord } from "./base_record";

interface Tools{
    id: number
    name: string
}
interface Skills{
    id: number
    name: string
}
 interface EmploymentType{
    id: number
    name: string
 }
 interface JobType{
    id: number
    name: string
 }
 interface Shifts{
    id: number
    name: string
 }
 interface Interview{
    id: number
    name: string
 }

export type ITemplates = IAuditInfo & {
    id: number
    uid: string
    categoryId: number
    jobTitle: string
    description: string
    tools: Tools[]
    skills: Skills[]
    employmentType: EmploymentType[]
    jobType: JobType[]
    shifts: Shifts[]
    interview: Interview[]
    jobSummary: string
    preferredSkills: string
    aboutCompany: string
    education: string
    location: string
    noOfOpenings: number
    salary: number
    experience: number
    jobValidUpto: number
}

export class templates extends AuditInfo implements IAuditInfo{
    public id: number
    public uid: string
    public categoryId: number
    public jobTitle: string
    public description: string
    public tools: Tools[]
    public skills: Skills[]
    public employmentType: EmploymentType[]
    public jobType: JobType[]
    public shifts: Shifts[]
    public interview: Interview[]
    public jobSummary: string
    public preferredSkills: string
    public aboutCompany: string
    public education: string
    public location: string
    public noOfOpenings: number
    public salary: number
    public experience: number
    public jobValidUpto: number
    constructor( categoryId: number,
        jobTitle: string,
        description: string,
        tools: Tools[],
        skills: Skills[],
        employmentType: EmploymentType[],
        jobType: JobType[],
        shifts: Shifts[],
        interview: Interview[],
        jobSummary: string,
        preferredSkills: string,
        aboutCompany: string,
        education: string,
        location: string,
        noOfOpenings: number,
        salary: number,
        experience: number,
        jobValidUpto: number,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?:IBaseRecord,
        lastUpdatedTime?: Date 
    ){
        super(createdBy,creationTime,lastUpdatedBy, lastUpdatedTime);
        this.categoryId = categoryId
        this.jobTitle = jobTitle
        this.description = description
        this.tools = tools
        this.skills = skills
        this.employmentType = employmentType
        this.jobType = jobType
        this.shifts = shifts
        this.interview = interview
        this.jobSummary = jobSummary
        this.preferredSkills = preferredSkills
        this.aboutCompany = aboutCompany
        this.education = education
        this.location = location
        this.noOfOpenings = noOfOpenings
        this.salary =salary
        this.experience = experience
        this.jobValidUpto = jobValidUpto
    }
}