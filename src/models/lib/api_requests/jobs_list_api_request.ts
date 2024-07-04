import {
  BaseListAPIRequest,
  IBaseListAPIRequest
} from './base_list_api_request';

export interface IJobsListAPIRequest extends IBaseListAPIRequest {
  categoryId: number,
  isActionableJobs: boolean
  location: string,
  jobTypeIds: string,
  employmentTypeIds: string,
  salaryFrom: number,
  salaryTo: number,
  experienceFrom: number,
  experienceTo: number,
  type: string,
}
export class JobsListAPIRequest extends BaseListAPIRequest implements IJobsListAPIRequest {
  public categoryId: number;
  public isActionableJobs: boolean;
  public location: string;
  public jobTypeIds: string;
  public employmentTypeIds: string;
  public salaryFrom: number;
  public salaryTo: number;
  public experienceFrom: number;
  public experienceTo: number;
  public type: string;
  constructor(
    searchText: string,
    pageNum: number,
    pageSize: number,
    categoryId: number,
    isActionableJobs: boolean,
    location: string,
    jobTypeIds: string,
    employmentTypeIds: string,
    salaryFrom: number,
    salaryTo: number,
    experienceFrom: number,
    experienceTo: number,
    type: string
  ) {
    super(searchText, pageNum, pageSize)
    this.categoryId = categoryId
    this.isActionableJobs = isActionableJobs
    this.location = location
    this.jobTypeIds = jobTypeIds
    this.employmentTypeIds = employmentTypeIds
    this.salaryFrom = salaryFrom
    this.salaryTo = salaryTo
    this.experienceFrom = experienceFrom
    this.experienceTo = experienceTo
    this.type = type
  }
}