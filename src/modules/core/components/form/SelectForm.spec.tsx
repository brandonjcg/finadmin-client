import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { SelectForm } from './SelectForm';

describe('Unit test SelectForm component', () => {
  const rows = [
    { _id: '1', text: 'BBVA' },
    { _id: '2', text: 'Nu' },
  ];

  test('Should render SelectForm component', () => {
    const props = {
      name: 'bank',
      label: 'Bank',
      rows,
    };

    const { getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <SelectForm {...props} />
        </Form>
      </Formik>,
    );

    const label = getByLabelText(props.label);

    expect(getByLabelText('Bank')).toBe(label);
  });
});
