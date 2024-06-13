import { AuditInfo, IAuditInfo } from './audit_info'
import { IBaseRecord } from './base_record'


export type ICourseDetails = IAuditInfo & {
    id: number
    uid: string
    title: string
    description: string
    videoFileUid: string
    thumbnailFileUid: string
    price: number
    discountPercentage: number
    aspects: string[]
    programId: number
    isPaidCourse: boolean
    courseCategoryId: number
    videoDuration: string
}

export class courseDetails extends AuditInfo implements ICourseDetails {
    public id: number
    public uid: string
    public title: string
    public description: string
    public videoFileUid: string
    public thumbnailFileUid: string
    public price: number
    public discountPercentage: number
    public aspects: string[]
    public programId: number
    public isPaidCourse: boolean
    public courseCategoryId: number
    public videoDuration: string
    constructor(title: string,
        description: string,
        videoFileUid: string,
        thumbnailFileUid: string,
        price: number,
        discountPercentage: number,
        aspects: string[],
        programId: number,
        isPaidCourse: boolean,
        courseCategoryId: number,
        videoDuration: string,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.title = title
        this.description = description
        this.videoFileUid = videoFileUid
        this.thumbnailFileUid = thumbnailFileUid
        this.price = price
        this.discountPercentage = discountPercentage
        this.aspects = aspects
        this.programId = programId
        this.isPaidCourse = isPaidCourse
        this.courseCategoryId = courseCategoryId
        this.videoDuration = videoDuration
    }

}
export type IModuleDetails = IAuditInfo & {
    moduleId: number
    uid: string
    moduleName: string
    description: string
}

export class moduleDetails extends AuditInfo implements IModuleDetails {
    public moduleId: number
    public uid: string
    public moduleName: string
    public description: string
    constructor(moduleName: string,
        description: string,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.moduleName = moduleName
        this.description = description
    }

}

export type ISectionDetails = IAuditInfo & {
    id: string
    uid: string,
    sectionName: string
    description: string

}

export class SectionDetails extends AuditInfo implements ISectionDetails {
    public id: string
    public uid: string
    public sectionName: string
    public description: string

    constructor(sectionName: string,
        description: string,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date
    ) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.sectionName = sectionName
        this.description = description
    }
}


export type ITestDetails = IAuditInfo & {
    id: string,
    testName: string,
    noOfQuestions: number,
    testDuration: string,
    points: number,
    marks: number,
}

export class testDetails extends AuditInfo implements ITestDetails {
    public id: string
    public testName: string
    public noOfQuestions: number
    public testDuration: string
    public points: number
    public marks: number

    constructor(testName: string,
        noOfQuestions: number,
        testDuration: string,
        points: number,
        marks: number,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date
    ) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.testName = testName
        this.noOfQuestions = noOfQuestions
        this.testDuration = testDuration
        this.points = points
        this.marks = marks
    }
}
export type ILessonDetails = IAuditInfo & {
    lessonId: number
    uid: string
    lessonName: string
    points: number
    videoFileUid: string
    attachmentFileUid: string,
    videoDuration: string,
    videoFileId?: number
    attachmentFileId?: number
}

export class lessonDetails extends AuditInfo implements ILessonDetails {
    public lessonId: number
    public uid: string
    public lessonName: string
    public points: number
    public videoFileUid: string
    public attachmentFileUid: string
    public videoDuration: string
    public videoFileId?: number
    public attachmentFileId?: number
    constructor(lessonName: string,
        points: number,
        videoFileUid: string,
        attachmentFileUid: string,
        videoDuration: string,
        videoFileId?: number,
        attachmentFileId?: number,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.lessonName = lessonName
        this.points = points
        this.videoFileUid = videoFileUid
        this.attachmentFileUid = attachmentFileUid
        this.videoDuration = videoDuration
        this.videoFileId = videoFileId
        this.attachmentFileId = attachmentFileId
    }

}
export type IAssignments = IAuditInfo & {
    assignmentId: string
    assignmentName: string
    description: string
    marks: number
    points: number

}

export class assignment extends AuditInfo implements IAssignments {
    public assignmentId: string
    public assignmentName: string
    public description: string
    public marks: number
    public points: number

    constructor(assignmentName: string,
        description: string,
        points: number,
        marks: number,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.assignmentName = assignmentName
        this.description = description
        this.points = points
        this.marks = marks

    }

}
