import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { DatepickerForm } from './DatepickerForm';

describe('Unit test DatepickerForm component', () => {
  test('Should render DatepickerForm component', () => {
    const props = {
      name: 'date',
      label: 'Payment date',
    };

    const { getByLabelText } = render(
      <Formik initialValues={{ amount: 0 }} onSubmit={() => {}}>
        <Form>
          <DatepickerForm {...props} />
        </Form>
      </Formik>,
    );

    const label = getByLabelText(props.label);

    expect(getByLabelText('Payment date')).toBe(label);
  });
});
