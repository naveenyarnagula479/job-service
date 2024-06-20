import {
    BaseListAPIRequest,
    IBaseListAPIRequest
} from './base_list_api_request';

export interface IJobsListAPIRequest extends IBaseListAPIRequest {
    categoryId: number,
    programId: number,
    templateUid: string
}
export class JobsListAPIRequest extends BaseListAPIRequest implements IJobsListAPIRequest {
  public categoryId: number;
  public programId: number;
  public templateUid: string;
  constructor(
    searchText: string,
    pageNum: number,
    pageSize: number,
    categoryId: number,
    programId: number,
    templateUid: string
  ){
    super(searchText, pageNum, pageSize)
    this.categoryId = categoryId,
    this.programId = programId,
    this.templateUid = templateUid
  }
}