import {
  BaseListAPIRequest,
  IBaseListAPIRequest
} from './base_list_api_request';

export interface ICandidateListAPIRequest extends IBaseListAPIRequest {
  status: string,
  jobRole: string
}
export class CandidateListAPIRequest extends BaseListAPIRequest implements ICandidateListAPIRequest {
  public status: string
  public jobRole: string
  constructor(
    searchText: string,
    pageNum: number,
    pageSize: number,
    status: string,
    jobRole: string
  ) {
    super(searchText, pageNum, pageSize)
    this.status = status
    this.jobRole = jobRole
  }
}