export interface Entry {
  id: number;
  name: string;
  date: string;
  title: string;
  field: string;
  old_value: any;
  new_value: any;
}

export type SortBy = "NAME" | "TITLE" | "FIELD";
export type SortOrder = "ASCENDING" | "DESCENDING";

export interface Filters {
  search?: string;
  searchBy?: SortBy;
  sortBy?: "DATE" | "TITLE" | "NAME" | "OLD_VALUE" | "NEW_VALUE";
  order?: SortOrder;
  from?: string;
  to?: string;
  page: number;
  pageSize?: 15 | 30 | 50 | 100;
}

export interface Pagination {
  items: Entry[];
  page: number;
  total: number;
  pageSize: number;
}
