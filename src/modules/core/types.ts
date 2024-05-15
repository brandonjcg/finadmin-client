import { IBank } from '../banks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export interface IResponseAxios {
  error: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: IResponseServer;
}

export interface IResponseServer {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  sort: string;
  order: string;
  rows: IBank[];
}
