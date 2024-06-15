// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export interface IInfo {
  page?: number;
  limit?: number;
  total: number;
  totalPages?: number;
  sort?: string;
  order?: string;
}

export interface IResponseAxios<T> {
  error: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T[];
  info: IInfo;
}

export interface ISelectOption {
  _id: string;
  logo: string;
  text: string;
}

export interface LoadingProviderProps {
  children: React.ReactNode;
}

export interface IPaginationState {
  page: number;
  pageSize: number;
  total: number;
}
