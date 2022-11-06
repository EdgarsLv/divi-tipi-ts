import { Iconify } from '@/components';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import { useState, useRef } from 'react';

export default function StartDiscussion() {
  const titleRef = useRef<HTMLInputElement>(null);
  const subtitleRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    const title = titleRef.current!.value;
    const subtitle = subtitleRef.current!.value;

    if (title.trim() === '' || subtitle.trim() === '') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        size='small'
        startIcon={<Iconify icon={'akar-icons:chat-add'} />}
        variant='contained'
        onClick={handleClickOpen}
      >
        Izveidot diskusiju
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: '10px' }}>Izveidot Diskusiju</DialogTitle>
        <DialogContent>
          <TextField inputRef={titleRef} label='Temats' fullWidth variant='standard' />
          <Divider />
          <Box sx={{ mb: '10px' }} />
          <TextField
            inputRef={subtitleRef}
            multiline
            rows={4}
            label='Apraksts'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSend}>
            Iesniegt
          </Button>
          <Button variant='outlined' onClick={handleClose}>
            Atcelt
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
