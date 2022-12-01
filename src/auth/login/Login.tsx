import { Logo, Page } from '@/components';
import { styled } from '@mui/material/styles';
import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Box, Link, Paper, Typography } from '@mui/material';
import { LoginForm } from '../login/components';
import loginImg from '../../assets/images/login.svg';
import { SectionText } from '../components';

function Login() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Ienākt'>
      <RootBox>
        <HeaderStyle>
          <Logo sx={{ width: 30 }} />

          {smUp && (
            <Typography color='text.secondary' variant='body2'>
              Neesi reģistrējies?
              <Link sx={{ ml: 1 }} variant='subtitle2' href='/register'>
                Reģistrēties
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        <InfoBox>
          {!mdUp && (
            <ImageBox>
              <img style={{ width: 150 }} src={loginImg} alt='login' />
            </ImageBox>
          )}
          <SectionText />

          {mdUp && (
            <Box>
              <img style={{ width: 350 }} src={loginImg} alt='login' />
            </Box>
          )}
        </InfoBox>

        <FormBox sx={{ boxShadow: 5 }}>
          <LoginForm />

          {!smUp && (
            <Typography color='text.secondary' variant='body2' align='center' sx={{ mt: 3 }}>
              Neesi reģistrējies?{' '}
              <Link variant='subtitle2' href='/register'>
                Reģistrēties
              </Link>
            </Typography>
          )}
        </FormBox>

        {!smUp && <Box sx={{ height: 10 }} />}
      </RootBox>
    </Page>
  );
}

export default Login;

export const RootBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(15),
    display: 'flex',
  },
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3, 2),
  alignItems: 'center',
  display: 'grid',

  [theme.breakpoints.up('md')]: {
    width: 'calc(55% - 120px)',
    marginLeft: theme.spacing(15),
  },
}));

export const ImageBox = styled(Box)(() => ({
  position: 'absolute',
  right: 10,
  bottom: 0,
  zIndex: -1,
}));

export const FormBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  margin: theme.spacing(2, 2),
  alignItems: 'center',
  display: 'grid',

  [theme.breakpoints.up('md')]: {
    width: 'calc(45% - 120px)',
    marginRight: theme.spacing(15),
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
  padding: theme.spacing(2, 3),
  justifyContent: 'space-between',

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 15),
  },
}));
