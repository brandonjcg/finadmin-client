// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export interface IResponseAxios<T> {
  error: boolean;
  statusCode: number;
  path: string;
  message: string;
  data: T[];
}

export interface ISelectOption {
  _id: string;
  logo: string;
  text: string;
}
