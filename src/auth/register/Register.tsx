import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Stack, Box } from '@mui/material';
import { Image, LogoWithText, Page } from '../../components';
import { ContentStyle, HeaderStyle, RootStyle, SectionStyle } from '../login/Login';
import { RegisterForm } from './components';
import registerImg from '../../assets/images/register.svg';

function Register() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Reģistrēties'>
      <RootStyle>
        <HeaderStyle>
          <LogoWithText />

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
            <Image alt='login' src={registerImg} />
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
