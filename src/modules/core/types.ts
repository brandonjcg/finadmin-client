// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export interface IResponseAxios<T> {
  error: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: IResponseServer<T>;
}

export interface IResponseServer<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  sort: string;
  order: string;
  rows: T[];
}

export interface ISelectOption {
  _id: string;
  text: string;
}
