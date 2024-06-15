import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingContext, ToastContext } from '../context';
import { IInfo, IResponseAxios } from '../types';
import { buildError } from '../utils';

const URL_API_SERVER = `${import.meta.env.VITE_API_SERVER_URL}`;

export const useFetchData = <T,>(
  url: string,
  page?: number,
  pageSize?: number,
  sortField?: string | null,
  sortOrder?: string | null,
  pagination = false,
) => {
  const { setIsLoading } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);

  const [data, setData] = useState<{
    data: T[];
    info: IInfo;
  }>({
    data: [],
    info: {
      total: 10,
      totalPages: 1,
      sort: 'createdAt',
      order: 'DESC',
    },
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
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
      showToast(buildError(error), 'error');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, page, pageSize, sortField, sortOrder, url, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export const useFetchById = <T,>(url: string, id: string | undefined) => {
  const { setIsLoading } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const [data, setData] = useState<T | null>(null);

  const fetchById = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = await axios.get<IResponseAxios<T>>(
        `${URL_API_SERVER}${url}/${id}`,
      );
      const data = response.data.data as T;

      setData(data);
    } catch (error) {
      showToast(buildError(error), 'error');
    } finally {
      setIsLoading(false);
    }
  }, [id, setIsLoading, url, showToast]);

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  return data;
};
