import { Field } from 'formik';

interface InputFormProps {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}

export const InputForm = ({
  name,
  label,
  type = 'text',
  textarea = false,
  required = false,
}: InputFormProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Field
        id={name}
        as={textarea && 'textarea'}
        name={name}
        type={type}
        required={required}
        className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
      />
    </>
  );
};
