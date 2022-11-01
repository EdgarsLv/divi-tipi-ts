import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Card, Stack, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Page } from '../../components';
import { LoginForm } from './components';

function Login() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Login'>
      <RootStyle>
        <HeaderStyle>
          <Paper elevation={1} sx={{ py: 1, px: 2 }}>
            <Typography>LOGO</Typography>
          </Paper>
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
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              Sveiki, laipni lūgts atpakaļ
            </Typography>
            <img
              alt='login'
              src='https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/.width-600_2YYrvS3.jpg'
            />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <Stack direction='row' alignItems='center' sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4'>Pieslēgties</Typography>
              </Box>
            </Stack>

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
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

export const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

export const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));
