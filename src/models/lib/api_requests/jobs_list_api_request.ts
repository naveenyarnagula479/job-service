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
  minSalary: number,
  maxSalary: number,
  minExperience: number,
  maxExperience: number,
  type: string,
}
export class JobsListAPIRequest extends BaseListAPIRequest implements IJobsListAPIRequest {
  public categoryId: number;
  public isActionableJobs: boolean;
  public location: string;
  public jobTypeIds: string;
  public employmentTypeIds: string;
  public minSalary: number;
  public maxSalary: number;
  public minExperience: number;
  public maxExperience: number;
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
    minSalary: number,
    maxSalary: number,
    minExperience: number,
    maxExperience: number,
    type: string
  ) {
    super(searchText, pageNum, pageSize)
    this.categoryId = categoryId
    this.isActionableJobs = isActionableJobs
    this.location = location
    this.jobTypeIds = jobTypeIds
    this.employmentTypeIds = employmentTypeIds
    this.minSalary = minSalary
    this.maxSalary = maxSalary
    this.minExperience = minExperience
    this.maxExperience = maxExperience
    this.type = type
  }
}