import {
    BaseListAPIRequest,
    IBaseListAPIRequest
  } from './base_list_api_request';
  
  export interface ICandidateListAPIRequest extends IBaseListAPIRequest {
    status: string
  }
  export class CandidateListAPIRequest extends BaseListAPIRequest implements ICandidateListAPIRequest {
    public status: string
    constructor(
      searchText: string,
      pageNum: number,
      pageSize: number,
      status: string
    ) {
      super(searchText, pageNum, pageSize)
      this.status = status
    }
  }