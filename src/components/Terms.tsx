import { useState, useEffect } from 'react';
import {
  Typography,
  Stack,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';
import { supabase } from '@/service';

export default function Terms() {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getPolicies = async () => {
      try {
        const { data, error } = await supabase.from('terms_and_conditions').select('*');
        setTerms(data);
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
          mx: 1,
          color: 'text.secondary',
          cursor: 'pointer',
          textDecorationLine: 'underline',
        }}
        onClick={handleClickOpen}
      >
        Lietošanas noteikumiem
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Lietošanas noteikumi</DialogTitle>
        <DialogContent dividers>
          {terms?.map((text: any, i: number) => (
            <Typography variant='subtitle2' sx={{ textAlign: 'justify', mb: 2 }} key={i}>
              {text.title === 'header' && text.description}
            </Typography>
          ))}
          {terms?.map((text: any, i: number) => (
            <Stack key={i}>
              <Typography variant='body2' sx={{ textAlign: 'justify', mb: 1 }}>
                {i + 1}. {text.description}
                {text.additional_info &&
                  text.additional_info.map((txt: any, index: number) => (
                    <Typography
                      variant='caption'
                      sx={{ display: 'block' }}
                      component='span'
                      key={index}
                    >
                      {index + 1}.{txt}
                    </Typography>
                  ))}
              </Typography>
            </Stack>
          ))}

          {terms?.map((text: any, i: number) => (
            <Typography variant='subtitle2' sx={{ textAlign: 'justify', mt: 2 }} key={i}>
              {text.title === 'footer' && text.description}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Aizvērt</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
