import { IBankSelect } from '@/modules';
import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface ITotalsItem {
  item: IBankSelect;
  checked: string[];
  setChecked: (value: string[]) => void;
  setTotal: (value: string) => void;
}

export const TotalsItem = ({
  item,
  checked,
  setChecked,
  setTotal,
}: ITotalsItem) => {
  const id = item._id;
  const idLabel = `checkbox-list-label-${id}`;

  const handleToggle = (value: string) => () => {
    setTotal('');
    const newChecked = [...checked];

    newChecked.includes(value)
      ? newChecked.splice(newChecked.indexOf(value), 1)
      : newChecked.push(value);

    setChecked(newChecked);
  };

  return (
    <ListItem
      key={id}
      onClick={handleToggle(id)}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(id)}
          checked={checked.indexOf(id) !== -1}
          inputProps={{ 'aria-labelledby': idLabel }}
        />
      }
      disablePadding
      className="bg-gray-800 mb-2 rounded"
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={`img-°${id + 1}`} src={item.logo} />
        </ListItemAvatar>
        <ListItemText id={idLabel} primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
};
