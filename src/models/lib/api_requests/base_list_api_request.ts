import { Pagination, SORT_ORDER } from '../../../constants/app_defaults'

export interface IBaseListAPIRequest {
  searchText?: string
  pageNum?: number
  pageSize?: number
  queryId?: string
  sortBy?: string
  sortOrder?: string
  fromDate?: string
  toDate?: string

}

export class BaseListAPIRequest implements IBaseListAPIRequest {
  public searchText?: string
  public pageNum?: number
  public pageSize?: number
  public queryId?: string
  public sortBy?: string
  public sortOrder?: string
  public fromDate?: string
  public toDate?: string

  constructor (searchText: string, pageNum?: number, pageSize?: number, queryId?: string, sortBy?: string,
    sortOrder?: string, fromDate?: string, toDate?: string) {
    this.searchText = searchText
    this.pageNum = typeof pageNum !== 'undefined' ? +pageNum : Pagination.PAGE_NUM
    this.pageSize = typeof pageSize !== 'undefined' ? +pageSize : Pagination.PAGE_SIZE
    this.queryId = queryId
    this.sortBy = sortBy
    this.sortOrder = sortOrder ?? SORT_ORDER
    this.fromDate = fromDate
    this.toDate = toDate
  }
}
