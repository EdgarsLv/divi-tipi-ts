import { Page } from '@/components';
import { PasswordChange } from '@/pages/settings/components';
import { Container, Typography } from '@mui/material';

function PasswordRecovery() {
  return (
    <Page title='Paroles maiņa'>
      <Container>
        <Typography variant='h3' sx={{ my: 2 }}>
          Paroles maiņa
        </Typography>
        <PasswordChange />
      </Container>
    </Page>
  );
}

export default PasswordRecovery;
