import {
  BaseListAPIRequest,
  IBaseListAPIRequest
} from './base_list_api_request';

export interface IJobsListAPIRequest extends IBaseListAPIRequest {
  categoryId: number,
  isActionableJobs: boolean
}
export class JobsListAPIRequest extends BaseListAPIRequest implements IJobsListAPIRequest {
  public categoryId: number;
  public isActionableJobs: boolean;
  constructor(
    searchText: string,
    pageNum: number,
    pageSize: number,
    categoryId: number,
    isActionableJobs: boolean
  ) {
    super(searchText, pageNum, pageSize)
    this.categoryId = categoryId
    this.isActionableJobs = isActionableJobs
  }
}