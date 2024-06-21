import { Field } from 'formik';

interface InputFormProps {
  name: string;
  label: string;
  type?: string;
}

export const InputForm = ({ name, label, type = 'text' }: InputFormProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
      />
    </>
  );
};