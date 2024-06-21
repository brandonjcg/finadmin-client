import { describe, expect, test } from 'vitest';
import { buildError } from '.';

describe('Unit test buildError fn', () => {
  test('Should retrun error message from axios response', async () => {
    const error = {
      response: {
        data: {
          message: 'Timeout',
        },
      },
    };

    const result = buildError(error);

    expect(result).toBe(error.response.data.message);
  });

  test('Should return default error message', async () => {
    const result = buildError({});

    expect(result).toBe('Error fetching data');
  });

  test('Should return default error message', async () => {
    const result = buildError(new Error('Error fetching data'));

    expect(result).toBe('Error fetching data');
  });
});
