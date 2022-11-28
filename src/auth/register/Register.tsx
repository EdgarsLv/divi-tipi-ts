import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Image, Logo, Page } from '../../components';
import { ContentStyle, HeaderStyle, RootStyle, TypographyStyle } from '../login/Login';
import { RegisterForm } from './components';
import loginImg from '../../assets/images/login.svg';

function Register() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Reģistrēties'>
      <RootStyle>
        <HeaderStyle>
          <Logo sx={{ width: 30 }} />

          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: -2 } }}>
              Jau esi reģistrējies? {''}
              <Link variant='subtitle2' href='/login'>
                Ienākt
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Box>
              <Typography variant='h1'>
                Divi
                <Typography component='span' variant='h1' sx={{ color: 'primary.main' }}>
                  &nbsp;Tipi
                </Typography>{' '}
                <br />
                jauns veids, kā iepazīties
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <TypographyStyle>Mēs zinām, ka atrast mīlestību var būt grūti,</TypographyStyle>
              <TypographyStyle>bet tā tam nav jābūt.</TypographyStyle>
            </Box>
            <Image sx={{ width: 350 }} alt='login' src={loginImg} />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <RegisterForm />

            {!smUp && (
              <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Jau esi reģistrējies?{' '}
                <Link variant='subtitle2' href='/login'>
                  Ienākt
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

export const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(15, 0, 2, 15),
}));
