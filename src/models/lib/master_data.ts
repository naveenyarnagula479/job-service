import { AuditInfo, IAuditInfo } from './audit_info'
import { IBaseRecord } from './base_record'

export type IMasterData = IAuditInfo & {
    id: string
    name : string
    categoryId : number,
    programId : number,
    description : string

}

export class MasterDataDetails extends AuditInfo implements IMasterData {
    public id: string
    public name: string
    public categoryId: number
    public programId: number 
    public description: string

    
    constructor(name: string,
        categoryId?: number,
        programId? : number,
        description? : string,
        createdBy?: IBaseRecord,
        creationTime?: Date,
        lastUpdatedBy?: IBaseRecord,
        lastUpdatedTime?: Date) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.name = name
        this.categoryId = categoryId
        this.programId = programId
        this.description = description
       
    }

}
