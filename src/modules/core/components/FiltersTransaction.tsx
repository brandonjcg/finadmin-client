import { FormControl } from '@mui/material';
import { FiltersTransactionItem } from './FiltersTransactionItem';

interface FiltersTransactionProps {
  isPaidChecked: string | boolean;
  setIsPaidChecked: (checked: boolean | string) => void;
  isReservedChecked: string | boolean;
  setIsReservedChecked: (checked: boolean | string) => void;
}

export const FiltersTransaction = ({
  isPaidChecked,
  setIsPaidChecked,
  isReservedChecked,
  setIsReservedChecked,
}: FiltersTransactionProps) => {
  return (
    <div className="flex justify-center items-center">
      <FormControl fullWidth>
        <FiltersTransactionItem
          title="Is paid?"
          checked={isPaidChecked}
          setChecked={setIsPaidChecked}
        />
      </FormControl>
      <FormControl fullWidth>
        <FiltersTransactionItem
          title="Is reserved?"
          checked={isReservedChecked}
          setChecked={setIsReservedChecked}
        />
      </FormControl>
    </div>
  );
};
