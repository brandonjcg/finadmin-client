import { Field } from 'formik';

interface CheckboxFormProps {
  name: string;
  label: string;
  required?: boolean;
}

export const CheckboxForm = ({
  name,
  label,
  required = false,
}: CheckboxFormProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Field
        type="checkbox"
        name={name}
        id={name}
        required={required}
        className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
      />
    </>
  );
};
