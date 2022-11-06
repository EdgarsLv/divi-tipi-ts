import { useState } from 'react';
import {
  Stack,
  Card,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, supabaseAdmin } from '@/service';

export default function DeleteAccount() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteUser = async () => {
    setIsDeleting(true);

    try {
      // eslint-disable-next-line camelcase
      await supabase.from('user_images').delete().match({ user_id: user?.id });
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user!.id);

      if (error) {
        throw new Error('Kļūda. Neizdevās izdzēst!');
      }
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant='subtitle1' sx={{ mb: 2 }}>
        Dzēst profilu
      </Typography>
      <Stack spacing={3} alignItems='flex-end'>
        <Alert sx={{ width: '100%' }} variant='outlined' severity='error'>
          Šis process ir neatgriezenisks!
        </Alert>

        <Button onClick={handleClickOpen} type='submit' variant='contained'>
          Dzēst profilu
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Tiešām vēlies dzēst profilu?'}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 0.5 }} id='alert-dialog-description'>
              Tikai pārjautājam, lai neizdzēstu nejaušības dēļ!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isDeleting}
              onClickCapture={() => onDeleteUser()}
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
      </Stack>
    </Card>
  );
}
