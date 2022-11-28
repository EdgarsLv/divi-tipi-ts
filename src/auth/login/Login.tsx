import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Logo, Page } from '../../components';
import { LoginForm } from './components';

import { FONT_SECONDARY } from '@/theme/typography';
import { SectionImage } from '../components';

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

        {mdUp && <SectionImage />}

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
  padding: theme.spacing(2, 3),
  justifyContent: 'space-between',

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 5),
  },
}));

export const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(15, 0, 2, 15),
}));

export const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // paddingBottom: theme.spacing(10),

  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
  },
}));

export const TypographyStyle = styled(Typography)(({ theme }) => ({
  textShadow: `2px 0 0 ${theme.palette.background.default}`,
  fontFamily: FONT_SECONDARY,
  fontWeight: 500,
}));
