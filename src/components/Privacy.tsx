import { useState, useEffect } from 'react';
import {
  Link,
  Typography,
  Stack,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';
import { supabase } from '@/service';

export default function Privacy() {
  const [open, setOpen] = useState(false);
  const [policy, setPolicy] = useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getPolicies = async () => {
      try {
        const { data, error } = await supabase.from('privacy_policy').select('*');
        setPolicy(data);
        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPolicies();
  }, [open]);

  return (
    <>
      <Typography
        component='span'
        variant='caption'
        sx={{
          display: 'inline-block',
          ml: 1,
          color: 'text.secondary',
          cursor: 'pointer',
          textDecorationLine: 'underline',
        }}
        onClick={handleClickOpen}
      >
        Privātuma politikai.
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Privātuma politika</DialogTitle>
        <DialogContent dividers>
          {policy?.map((text: any, i: number) => (
            <Stack key={i}>
              <Typography variant='body2' sx={{ textAlign: 'justify', mb: 1 }}>
                {i + 1}. {text.description}
              </Typography>
            </Stack>
          ))}

          <Link href='mailto: info@divitipi.lv' variant='subtitle1'>
            info@divitipi.lv
          </Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Aizvērt</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
