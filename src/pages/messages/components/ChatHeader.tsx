import { useState } from 'react';
import { styled } from '@mui/material/styles';
// prettier-ignore
import {
  Box, Avatar, Typography, IconButton, Link, Dialog, Button,
  DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { Iconify } from '@/components';
import { getAvatar } from '../utils';
import { Conversation } from '@/types';

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 52,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
}));

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  marginRight: '10px',
  padding: '0 5px',
}));

export default function ChatHeader({ selected }: { selected: Conversation }) {
  const [open, setOpen] = useState(false);

  const avatar = getAvatar(selected);

  // const handleDeleteConveration = async (id) => {
  //   try {
  //     const { error } = await supabase
  //       .from('conversations')
  //       .delete()
  //       .match({ id: Number(id) });

  //     if (error) {
  //       throw error;
  //     }
  //     if (!error) {
  //       navigate(PATH_MAIN.messages.root, { replace: true });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <RootStyle>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar variant='rounded' src={avatar} alt='userimg' />
        </Box>
        {!selected?.isDeleted && (
          <LinkStyle underline='always' href={`/user/${selected?.user?.userId}`} sx={{ ml: 1 }}>
            <Typography variant='subtitle2'>
              {selected?.user?.name} {selected?.user?.age}
            </Typography>
          </LinkStyle>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={() => setOpen(true)}>
        <Iconify icon={'ic:outline-delete-forever'} sx={{ width: 20, height: 20 }} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tiešām vēlies dzēst saraksti?</DialogTitle>
        <DialogContent>
          <DialogContentText>Tikai pārjautājam, lai neizdzēstu nejaušības dēļ!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClickCapture={() => console.log('delete')}
            variant='contained'
            color='error'
            onClick={handleClose}
          >
            Dzēst
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Nē
          </Button>
        </DialogActions>
      </Dialog>
    </RootStyle>
  );
}
