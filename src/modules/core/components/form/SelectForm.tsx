import { Field } from 'formik';
import { ISelectOption } from '../../types';

interface SelectFormProps {
  rows: ISelectOption[];
  name: string;
  label: string;
}

export const SelectForm = ({ rows, name, label }: SelectFormProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-gray-700"
      >
        <option value="">{`Seleccionar ${label.toLowerCase()}`}</option>
        {rows.map((item) => (
          <option key={item._id} value={item._id}>
            {item.text}
          </option>
        ))}
      </Field>
    </>
  );
};
