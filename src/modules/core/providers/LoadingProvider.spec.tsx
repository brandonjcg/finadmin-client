import { ReactNode, useContext } from 'react';
import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { LoadingProvider } from './LoadingProvider';
import { LoadingContext } from '../context';

describe('Unit test LoadingProvider', () => {
  test('Should increment loading count', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LoadingProvider>{children}</LoadingProvider>
    );

    const { result } = renderHook(() => useContext(LoadingContext), {
      wrapper,
    });

    act(() => {
      result.current.incrementLoading();
      result.current.incrementLoading();
      result.current.incrementLoading();
      result.current.incrementLoading();
    });

    expect(result.current.loadingCount).toBe(4);
  });

  test('Should decrement loading count', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LoadingProvider>{children}</LoadingProvider>
    );

    const { result } = renderHook(() => useContext(LoadingContext), {
      wrapper,
    });

    act(() => {
      result.current.incrementLoading();
      result.current.incrementLoading();
      result.current.incrementLoading();
      result.current.incrementLoading();
    });

    act(() => {
      result.current.decrementLoading();
      result.current.decrementLoading();
    });

    expect(result.current.loadingCount).toBe(2);
  });

  test('Should not decrement loading count below 0', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <LoadingProvider>{children}</LoadingProvider>
    );

    const { result } = renderHook(() => useContext(LoadingContext), {
      wrapper,
    });

    act(() => {
      result.current.incrementLoading();
      result.current.incrementLoading();
      result.current.incrementLoading();
      result.current.incrementLoading();
    });

    act(() => {
      result.current.decrementLoading();
      result.current.decrementLoading();
      result.current.decrementLoading();
      result.current.decrementLoading();
      result.current.decrementLoading();
      result.current.decrementLoading();
    });

    expect(result.current.loadingCount).toBe(0);
  });
});
