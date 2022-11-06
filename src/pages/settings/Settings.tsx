import { Page } from '@/components';
import { Container, Stack, Typography } from '@mui/material';
import { DeleteAccount, EmailChange, PasswordChange, PersonalityChange } from './components';

function Settings() {
  return (
    <Page title='Iestatījumi'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Iestatījumi
        </Typography>

        <Stack spacing={2}>
          <PersonalityChange />
          <PasswordChange />
          <EmailChange />
          <DeleteAccount />
        </Stack>
      </Container>
    </Page>
  );
}

export default Settings;
