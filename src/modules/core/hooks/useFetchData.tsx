import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IInfo, IResponseAxios } from '../types';
import { LoadingContext } from '../context';
import { buildError } from '../utils';

const URL_API_SERVER = `${import.meta.env.VITE_API_SERVER_URL}`;

type FetchDataProps = {
  url: string;
  page?: number;
  pageSize?: number;
  sortField?: string | null;
  sortOrder?: string | null;
  pagination?: boolean;
};

export const useFetchData = <T,>({
  url,
  page,
  pageSize,
  sortField = 'createdAt',
  sortOrder = 'desc',
  pagination = false,
}: FetchDataProps) => {
  const { incrementLoading, decrementLoading } = useContext(LoadingContext);

  const [data, setData] = useState<{
    data: T[];
    info: IInfo;
  }>({
    data: [],
    info: {
      total: 10,
      totalPages: 1,
      sort: 'createdAt',
      order: 'desc',
    },
  });

  const fetchData = useCallback(async () => {
    try {
      const params = {
        ...(page !== undefined &&
          pageSize !== undefined &&
          sortField !== undefined &&
          sortOrder !== undefined && {
            page: page + 1,
            limit: pageSize,
            sort: sortField,
            order: sortOrder,
          }),
      };
      if (pagination && !params.page) return;

      incrementLoading();

      const response = await axios.get<IResponseAxios<T>>(
        `${URL_API_SERVER}${url}`,
        {
          params,
        },
      );
      const responseData = response.data.data;

      setData({
        data: responseData ?? [],
        info: response.data.info,
      });
    } catch (error) {
      buildError(error);
    }
    decrementLoading();
  }, [
    decrementLoading,
    page,
    pageSize,
    sortField,
    sortOrder,
    pagination,
    incrementLoading,
    url,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export const useFetchById = <T,>(url: string, id: string) => {
  const { incrementLoading, decrementLoading } = useContext(LoadingContext);
  const [data, setData] = useState<T | null>(null);

  const fetchById = useCallback(async () => {
    if (!id) return;

    incrementLoading();

    try {
      const response = await axios.get<IResponseAxios<T>>(
        `${URL_API_SERVER}${url}/${id}`,
      );
      const data = response.data.data as T;

      setData(data);
    } catch (error) {
      buildError(error);
    }

    decrementLoading();
  }, [decrementLoading, id, incrementLoading, url]);

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  return data;
};

export const usePostData = <T,>(url: string) => {
  const { incrementLoading, decrementLoading } = useContext(LoadingContext);

  const postData = async (data: T) => {
    incrementLoading();
    try {
      const response = await axios.post(`${URL_API_SERVER}${url}`, data);
      return response.data;
    } catch (error) {
      buildError(error);
      throw error;
    } finally {
      decrementLoading();
    }
  };

  return postData;
};
