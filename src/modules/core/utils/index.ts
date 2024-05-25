import { AxiosError } from 'axios';
import { IResponseAxios } from '../types';

export const buildError = <T>(error: Error | unknown) => {
  const data = error as AxiosError<IResponseAxios<T>>;
  const message = data.response?.data.message;
  return message ?? 'Error fetching data';
};
