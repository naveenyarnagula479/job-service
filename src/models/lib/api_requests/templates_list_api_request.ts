import {
    BaseListAPIRequest,
    IBaseListAPIRequest
} from './base_list_api_request';

export interface ITemplatesListAPIRequest extends IBaseListAPIRequest {
    categoryId: number
}
export class TemplatesListAPIRequest extends BaseListAPIRequest implements ITemplatesListAPIRequest {
  public categoryId: number;
  constructor(
    searchText: string,
    pageNum: number,
    pageSize: number,
    categoryId: number
  ){
    super(searchText, pageNum, pageSize)
    this.categoryId = categoryId
  }
}