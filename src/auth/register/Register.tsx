import { Logo, Page } from '@/components';
import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Box, Link, Typography } from '@mui/material';
import loginImg from '../../assets/images/login.svg';
import { SectionText } from '../components';
import { FormBox, HeaderStyle, ImageBox, InfoBox, RootBox } from '../login/Login';
import { RegisterForm } from './components';

function Register() {
  const smUp = useResponsive(Responsive.Up, Size.Sm);

  const mdUp = useResponsive(Responsive.Up, Size.Md);

  return (
    <Page title='Reģistrēties'>
      <RootBox>
        <HeaderStyle>
          <Logo sx={{ width: 30 }} />

          {smUp && (
            <Typography color='text.secondary' variant='body2'>
              Jau esi reģistrējies? {''}
              <Link variant='subtitle2' href='/login'>
                Ienākt
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
          <RegisterForm />

          {!smUp && (
            <Typography color='text.secondary' variant='body2' align='center' sx={{ mt: 3 }}>
              Jau esi reģistrējies?{' '}
              <Link variant='subtitle2' href='/login'>
                Ienākt
              </Link>
            </Typography>
          )}
        </FormBox>

        {!smUp && <Box sx={{ height: 10 }} />}
      </RootBox>
    </Page>
  );
}

export default Register;
