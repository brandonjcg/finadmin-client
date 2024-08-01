import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';

interface DialogFormProps {
  open: boolean;
  handleClose: () => void;
  data: GridRowSelectionModel;
  handleSubmit: (process: number) => void;
}

export const DialogForm = ({
  open,
  handleClose,
  data,
  handleSubmit,
}: DialogFormProps) => {
  const [process, setProcess] = useState<number | string>('');

  const handleProcess = (process: number) => {
    console.log('🚀 ~ data:', data);
    handleSubmit(process);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>Run process</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputLabel id="idProcess">Select a process</InputLabel>
        <Select
          labelId="idProcess"
          id="idProcess"
          value={process}
          label="Select a process"
          onChange={(e) => setProcess(e.target.value as number)}
        >
          <MenuItem value={1}>Set is paid in true</MenuItem>
          <MenuItem value={2}>Set is reserved in true</MenuItem>
          <MenuItem value={3}>
            Set is paid in true and is reserved in true
          </MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={process === ''}
          type="submit"
          onClick={() => handleProcess(process as number)}
        >
          Process
        </Button>
      </DialogActions>
    </Dialog>
  );
};
