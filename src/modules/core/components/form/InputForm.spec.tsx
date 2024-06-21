import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { InputForm } from './InputForm';

describe('Unit test InputForm component', () => {
  test('Should render InputForm component', () => {
    const props = {
      name: 'amount',
      label: 'Amount',
      type: 'number',
    };

    const { getByLabelText } = render(
      <Formik initialValues={{ amount: 0 }} onSubmit={() => {}}>
        <Form>
          <InputForm {...props} />
        </Form>
      </Formik>,
    );

    const label = getByLabelText(props.label);

    expect(getByLabelText('Amount')).toBe(label);
  });

  test('Should render InputForm component with default type', () => {
    const props = {
      name: 'concept',
      label: 'Concept',
    };

    const { getByLabelText } = render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <InputForm {...props} />
        </Form>
      </Formik>,
    );

    const label = getByLabelText(props.label);

    expect(label.getAttribute('type')).toBe('text');
  });
});
