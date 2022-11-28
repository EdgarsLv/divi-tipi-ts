import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Page, SentIcon } from '@/components';
import { Button, Container, Typography, Box } from '@mui/material';
import { ResetForm } from './components';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title='Paroles attiestatīšana' sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant='h3' paragraph>
                  Atjaunot paroli
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Lai atjaunotu paroli, lūdzu, ievadiet portālā reģistrēto e-pasta adresi. Uz šo
                  e-pastu tiks nosūtīta informācija par tālāko rīcību.
                </Typography>

                <ResetForm
                  onSent={() => setSent(true)}
                  onGetEmail={(value: string) => setEmail(value)}
                />

                <Button component={RouterLink} to='/login' fullWidth sx={{ mt: 1 }}>
                  Atpakaļ
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant='h3' gutterBottom>
                  Pieprasījums veiksmīgi nosūtīts
                </Typography>
                <Typography>
                  Mēs esam nosūtījuši apstiprinājuma e-pastu uz &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Lūdzu pārbaudiet e-pastu.
                </Typography>

                <Button component={RouterLink} to='/login' variant='contained' sx={{ mt: 5 }}>
                  Atpakaļ
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default ResetPassword;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));
