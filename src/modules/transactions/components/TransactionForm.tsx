import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, FieldProps } from 'formik';
import {
  ISelectOption,
  useFetchData,
  useFetchById,
  ITransaction,
  InputForm,
  SelectForm,
} from '@/modules';

const url = `${import.meta.env.VITE_API_SERVER_URL}`;

interface MyFormValues {
  date: string | Date;
}

type Params = {
  id: string;
};

export const TransactionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams() as Params;
  const fetchById = useFetchById<ITransaction>('transaction', id);
  const { data: banks } = useFetchData<ISelectOption>({ url: 'bank/select' });

  return (
    <Formik
      enableReinitialize
      initialValues={fetchById || {}}
      onSubmit={async (values) => {
        try {
          if (id) {
            await axios.patch(`${url}transaction/${id}`, values);
          } else {
            await axios.post(`${url}transaction`, values);
          }

          navigate('/transaction');
        } catch (error) {
          console.log('🚀 ~ onSubmit={ ~ error:', error);
        }
      }}
    >
      <Form className="space-y-4">
        <SelectForm rows={banks} name="bank" label="Bank" />
        <InputForm name="concept" label="Concept" />
        <InputForm name="store" label="Store" />
        <InputForm name="amount" label="Amount" type="number" />

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300"
          >
            Date
          </label>
          <Field name="date">
            {({ field, form }: FieldProps<MyFormValues>) => (
              <input
                type="date"
                {...field}
                value={
                  field?.value
                    ? new Date(String(field.value)).toISOString().split('T')[0]
                    : ''
                }
                onChange={(event) => {
                  const date = new Date(event?.target?.value);
                  form.setFieldValue(field?.name, date);
                }}
                className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
              />
            )}
          </Field>
        </div>

        <div>
          <label
            htmlFor="isReserved"
            className="block text-sm font-medium text-gray-300"
          >
            Is reserved?
          </label>
          <Field
            type="checkbox"
            name="isReserved"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
          />
        </div>

        <div>
          <label
            htmlFor="isPaid"
            className="block text-sm font-medium text-gray-300"
          >
            Is paid?
          </label>
          <Field
            type="checkbox"
            name="isPaid"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
          />
        </div>

        <div>
          <label
            htmlFor="additionalComments"
            className="block text-sm font-medium text-gray-300"
          >
            Additional comments
          </label>
          <Field
            as="textarea"
            name="additionalComments"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {id ? 'Update' : 'Create'}
        </button>
      </Form>
    </Formik>
  );
};
