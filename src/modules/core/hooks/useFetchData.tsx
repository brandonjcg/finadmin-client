import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingContext, ToastContext } from '../context';
import { IResponseAxios } from '../types';
import { buildError } from '../utils';

const URL_API_SERVER = `${import.meta.env.VITE_API_SERVER_URL}`;

export const useFetchData = <T,>(
  url: string,
  page?: number,
  pageSize?: number,
) => {
  const { setIsLoading } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);

  const [data, setData] = useState<{
    data: T[];
  }>({
    data: [],
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const config = {
        params: {},
      };
      if (page !== undefined && pageSize !== undefined) {
        config.params = {
          page: page + 1,
          limit: pageSize,
        };
      }
      const response = await axios.get<IResponseAxios<T>>(
        `${URL_API_SERVER}${url}`,
        config,
      );
      const responseData = response.data.data;
      setData({
        data: responseData ?? [],
      });
    } catch (error) {
      showToast(buildError(error), 'error');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, page, pageSize, url, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export const useFetchById = <T,>(url: string) => {
  const { setIsLoading } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);

  const fetchById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get<IResponseAxios<T>>(
          `${URL_API_SERVER}${url}/${id}`,
        );
        const data = response.data.data;

        return data;
      } catch (error) {
        showToast(buildError(error), 'error');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, url, showToast],
  );

  return fetchById;
};
