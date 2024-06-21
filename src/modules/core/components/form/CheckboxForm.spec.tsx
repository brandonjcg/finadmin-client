import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { CheckboxForm } from './CheckboxForm';

describe('Unit test CheckboxForm component', () => {
  test('Should render CheckboxForm component', () => {
    const props = {
      name: 'isPaid',
      label: 'Is paid?',
    };

    const { getByLabelText } = render(
      <Formik initialValues={{ amount: 0 }} onSubmit={() => {}}>
        <Form>
          <CheckboxForm {...props} />
        </Form>
      </Formik>,
    );

    const label = getByLabelText(props.label);

    expect(getByLabelText('Is paid?')).toBe(label);
  });
});
