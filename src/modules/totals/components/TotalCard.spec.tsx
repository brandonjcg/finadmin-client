import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { TotalCard } from './TotalCard';

describe('Unit test TotalCard component', () => {
  test('Should render TotalCard component', () => {
    const { getByLabelText } = render(<TotalCard total={'102,000'} />);

    const label = getByLabelText('Total');

    expect(getByLabelText('Total')).toBe(label);
  });
});
