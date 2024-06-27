import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface FiltersTransactionItemProps {
  title: string;
  checked: string | boolean;
  setChecked: (value: string | boolean) => void;
}

interface FiltersTransactionItemProps {
  title: string;
  checked: string | boolean;
  setChecked: (value: string | boolean) => void;
}

export const FiltersTransactionItem = ({
  title,
  checked,
  setChecked,
}: FiltersTransactionItemProps) => {
  const handleChange = () => {
    const isCheckedFalse = checked === false ? 'empty' : true;
    const nextState = checked === true ? false : isCheckedFalse;
    setChecked(nextState);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked === true}
          indeterminate={checked === false}
          onChange={handleChange}
          color="primary"
        />
      }
      label={title}
    />
  );
};
