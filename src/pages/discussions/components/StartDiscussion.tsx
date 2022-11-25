import { Iconify } from '@/components';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { startDiscussion } from '@/redux/slices/discussionsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CommentAuthor } from '@/types';
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

  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);

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
    const time = new Date().toISOString();

    if (title.trim() === '' || subtitle.trim() === '') {
      return;
    }

    const content = {
      title,
      subtitle,
      // eslint-disable-next-line camelcase
      author_id: account.id,
    };

    const author: CommentAuthor = {
      age: account.age,
      name: account.name,
      // eslint-disable-next-line camelcase
      avatar_image: { avatar: account?.avatar_image?.avatar, updated_at: time },
    };

    dispatch(startDiscussion(content, author));

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
