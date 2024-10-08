import { AxiosError } from 'axios';
import { IResponseAxios } from '../types';
import { ZustandState } from '@/modules';
import toast from 'react-hot-toast';

export const buildError = <T>(error: Error | unknown) => {
  const data = error as AxiosError<IResponseAxios<T>>;
  const message =
    data.response?.data.message ?? `${data.message}: ${data.config?.url}`;

  Array.isArray(message)
    ? message.forEach((m) => toast.error(m))
    : toast.error(message ?? 'Error fetching data');
};

export const hasAuthUser = () => {
  const auth = localStorage.getItem('token') as string;
  if (!auth) return null;

  const authJson = JSON.parse(auth) as ZustandState;

  return authJson.state.token || null;
};
