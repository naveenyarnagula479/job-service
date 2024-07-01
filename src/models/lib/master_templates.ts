import { AuditInfo, IAuditInfo } from "./audit_info";
import { IBaseRecord } from "./base_record";

interface ITool {
    id: string;
    name: string;
    createdBy: string;
}

interface ISkill {
    id: number;
    name: string;
    createdBy: string;
}

interface IEmploymentType {
    id: number;
    name: string;
    createdBy: string;
}

interface IJobType {
    id: number;
    name: string;
    createdBy: string;
}

interface IShift {
    id: number;
    name: string;
    createdBy: string;
}

interface IInterview {
    id: number;
    name: string;
    createdBy: string;
}

export type IMasterTemplates = IAuditInfo & {
    id: number
    uid: string
    jobTitle: string
    description: string
    tools: ITool[]
    skills: ISkill[]
    employmentType: IEmploymentType[]
    jobType: IJobType[]
    shifts: IShift[]
    interview: IInterview[]
    requirements: string
    jobSummary: string
    preferredSkills: string
    aboutCompany: string
    education: string
    jobValidUpto: number
    location: string
    noOfOpenings: number
    salary: number
    salaryType: string
    experience: number

}

export class masterTemplates extends AuditInfo implements IAuditInfo {
    public id: number
    public uid: string
    public jobTitle: string
    public description: string
    public tools: ITool[]
    public skills: ISkill[]
    public employmentType: IEmploymentType[]
    public jobType: IJobType[]
    public shifts: IShift[]
    public interview: IInterview[]
    public requirements: string
    public jobSummary: string
    public preferredSkills: string
    public aboutCompany: string
    public education: string
    public jobValidUpto: number
    public location: string
    public noOfOpenings: number
    public salary: number
    public salaryType: string
    public experience: number
    constructor(jobTitle: string,
        description: string,
        tools: ITool[],
        skills: ISkill[],
        employmentType: IEmploymentType[],
        jobType: IJobType[],
        shifts: IShift[],
        interview: IInterview[],
        requirements: string,
        jobSummary: string,
        preferredSkills: string,
        aboutCompany: string,
        education: string,
        jobValidUpto: number,
        location: string,
        noOfOpenings: number,
        salary: number,
        salaryType: string,
        experience: number,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date
    ) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.jobTitle = jobTitle
        this.description = description
        this.tools = tools
        this.skills = skills
        this.employmentType = employmentType
        this.jobType = jobType
        this.shifts = shifts
        this.interview = interview
        this.requirements = requirements
        this.jobSummary = jobSummary
        this.preferredSkills = preferredSkills
        this.aboutCompany = aboutCompany
        this.education = education
        this.jobValidUpto = jobValidUpto
        this.location = location
        this.noOfOpenings = noOfOpenings
        this.salary = salary
        this.salaryType = salaryType
        this.experience = experience
    }
}