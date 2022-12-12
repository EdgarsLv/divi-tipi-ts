/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { Page } from '@/components';
import { selectAccountData, updateIQVisibility } from '@/redux/slices/accountSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Container, Paper, Typography, Stack, Checkbox } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

function IqResult() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { iq_value, iq_public } = useAppSelector(selectAccountData);

  const [checked, setChecked] = useState(iq_public);

  useEffect(() => {
    setChecked(iq_public);
  }, [iq_public]);

  const handleChange = () => {
    setChecked(!checked);

    dispatch(updateIQVisibility(!checked, user?.id));
  };
  return (
    <Page title='Iq - rezultāts'>
      <Container>
        <Typography variant='h3' sx={{ my: 2 }}>
          Iq - rezultāts
        </Typography>

        <Paper sx={{ p: 2 }}>
          <Typography>
            Mans rezultāts:{' '}
            <Typography variant='subtitle1' component='span'>
              {iq_value}
            </Typography>
          </Typography>

          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography>Rādīt rezultātu pie profila?</Typography>

            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
        </Paper>

        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography>Drīzumā būs pieejama statistika par portālu kopumā!</Typography>
        </Paper>
      </Container>
    </Page>
  );
}

export default IqResult;
