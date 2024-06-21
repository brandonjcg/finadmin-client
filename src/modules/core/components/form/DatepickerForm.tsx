import { Field, FieldProps } from 'formik';

interface MyFormValues {
  date: string | Date;
}

interface DatepickerFormProps {
  name: string;
  label: string;
}

export const DatepickerForm = ({ name, label }: DatepickerFormProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <Field name={name}>
        {({ field, form }: FieldProps<MyFormValues>) => (
          <input
            type="date"
            id={name}
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
    </>
  );
};
