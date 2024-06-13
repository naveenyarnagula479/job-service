export interface IListAPIResponse {
    list: any[];
    totalResultsCount: number;
    hasMoreResults: boolean;
    fromIndex: number;
    toIndex: number;
    sortBy?: string;
    sortOrder?: string;
    pageNum?: number;
    pageSize?: number;
}

export class ListAPIResponse implements IListAPIResponse {
    public list: any[];
    public totalResultsCount: number;
    public hasMoreResults: boolean;
    public fromIndex: number;
    public toIndex: number;
    public sortBy?: string;
    public sortOrder?: string;
    public pageNum?: number;
    public pageSize?: number;

    constructor(resultsList: any[], hasMoreResults?: boolean, fromIndex?: number, toIndex?: number,
                totalResultsCount?: number,  sortBy?: string, sortOrder?: string, pageNum?: number, pageSize?: number) {
        this.list = resultsList;
        this.hasMoreResults = hasMoreResults;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.totalResultsCount = totalResultsCount;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
    }
}