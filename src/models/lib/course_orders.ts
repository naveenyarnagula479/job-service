import { AuditInfo, IAuditInfo } from './audit_info'
import { IBaseRecord } from './base_record'


export type IBillingAddress = IAuditInfo & {
    id: number
    courseOrderUid: string
    addressLine: string
    city: string
    district: string
    state: string
    country: string
    pincode: string
}

export class BillingAddress extends AuditInfo implements IBillingAddress {
    public id: number
    public courseOrderUid: string
    public addressLine: string
    public city: string
    public district: string
    public state: string
    public country: string
    public pincode: string

    constructor(courseOrderUid: string, addressLine: string, city: string, district: string, state: string, country: string, pincode: string,
        createdBy?: IBaseRecord, creationTime?: Date, lastUpdatedBy?: IBaseRecord, lastUpdatedTime?: Date) {
        super(createdBy, creationTime, lastUpdatedBy, lastUpdatedTime);
        this.courseOrderUid = courseOrderUid,
            this.addressLine = addressLine,
            this.city = city,
            this.district = district,
            this.state = state,
            this.country = country,
            this.pincode = pincode
    }

}