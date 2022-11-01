import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Stack, Box, Paper } from '@mui/material';

import { Page } from '../../components';
import { ContentStyle, HeaderStyle, RootStyle, SectionStyle } from '../login/Login';
import { RegisterForm } from './components';

function Register() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Register'>
      <RootStyle>
        <HeaderStyle>
          <Paper elevation={1} sx={{ py: 1, px: 2 }}>
            <Typography>LOGO</Typography>
          </Paper>
          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: -2 } }}>
              Jau esi reģistrējies? {''}
              <Link variant='subtitle2' href='/login'>
                Pieslegties
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Reģistrējies un atrodi savu saderīgo!
            </Typography>
            <img
              alt='login'
              src='https://artincontext.org/wp-content/uploads/2021/05/Abstract-Art-Examples.jpg'
            />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <Stack direction='row' alignItems='center' sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4'>Reģistrēties</Typography>
              </Box>
            </Stack>

            <RegisterForm />

            <Typography variant='body2' align='center' sx={{ color: 'text.secondary', mt: 3 }}>
              Reģistrējoties es piekrītu&nbsp;
              <Link href='/'>terms of service</Link>
              un
              <Link href='/'>privacy police</Link>
            </Typography>

            {!smUp && (
              <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Jau esi reģistrējies?{' '}
                <Link variant='subtitle2' href='/login'>
                  Pieslēgties
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default Register;
