import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Image, Logo, Page } from '../../components';
import { LoginForm } from './components';
import loginImg from '../../assets/images/login.svg';
import { FONT_SECONDARY } from '@/theme/typography';

function Login() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Ienākt'>
      <RootStyle>
        <HeaderStyle>
          <Logo sx={{ width: 30 }} />

          {smUp && (
            <Typography variant='body2' sx={{ mt: { md: -2 } }}>
              Neesi reģistrējies? {''}
              <Link variant='subtitle2' href='/register'>
                Reģistrēties
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

        <Container>
          <ContentStyle>
            <LoginForm />

            {!smUp && (
              <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                Neesi reģistrējies?{' '}
                <Link variant='subtitle2' href='/register'>
                  Reģistrēties
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default Login;

export const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(2, 5),
  justifyContent: 'space-between',
}));

export const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(15, 0, 2, 15),
}));

export const ContentStyle = styled('div')(() => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const TypographyStyle = styled(Typography)(({ theme }) => ({
  textShadow: `2px 0 0 ${theme.palette.background.default}`,
  fontFamily: FONT_SECONDARY,
  fontWeight: 500,
}));
