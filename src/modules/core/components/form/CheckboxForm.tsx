import { Field } from 'formik';

interface CheckboxFormProps {
  name: string;
  label: string;
}

export const CheckboxForm = ({ name, label }: CheckboxFormProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <Field
        type="checkbox"
        name={name}
        id={name}
        className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
      />
    </>
  );
};
