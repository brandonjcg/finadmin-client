import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  ISelectOption,
  useFetchData,
  useFetchById,
  ITransaction,
  InputForm,
  SelectForm,
  CheckboxForm,
  DatepickerForm,
  buildError,
  usePostData,
} from '@/modules';

type Params = {
  id: string;
};

const initialValues: ITransaction = {
  _id: '',
  bank: {
    _id: '',
    name: '',
    logo: '',
    active: false,
    createdAt: '',
    updatedAt: '',
  },
  concept: '',
  store: '',
  date: new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Tijuana',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
  isReserved: false,
  isPaid: false,
  additionalComments: '',
  amount: 0,
  active: false,
  __v: 0,
  createdAt: '',
  updatedAt: '',
};

export const TransactionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams() as Params;
  const fetchById = useFetchById<ITransaction>('transaction', id);
  const { data: banks } = useFetchData<ISelectOption>({ url: 'bank/select' });

  const values = fetchById || initialValues;
  const postData = usePostData('transaction');
  const patchData = usePostData(`transaction/${id}`, false);

  const onSubmit = async (body: ITransaction) => {
    try {
      if (id) {
        return patchData(body);
      }
      return postData(body);
    } catch (error) {
      buildError(error);
    } finally {
      navigate('/transaction', { replace: true });
    }
  };

  return (
    <Formik enableReinitialize initialValues={values} onSubmit={onSubmit}>
      <Form className="space-y-4">
        <SelectForm rows={banks} name="bank" label="Bank" required />
        <InputForm name="concept" label="Concept" required />
        <InputForm name="store" label="Store" required />
        <InputForm name="amount" label="Amount" type="number" required />
        <DatepickerForm name="date" label="Date" required />
        <CheckboxForm name="isReserved" label="Is reserved?" />
        <CheckboxForm name="isPaid" label="Is paid?" />
        <InputForm
          name="additionalComments"
          label="Additional comments"
          textarea
        />

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
