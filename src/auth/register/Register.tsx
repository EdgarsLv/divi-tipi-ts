import useResponsive, { Responsive, Size } from '@/hooks/useResponsive';
import { Link, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Logo, Page } from '../../components';
import { ContentStyle, HeaderStyle, RootStyle } from '../login/Login';
import { RegisterForm } from './components';
import { SectionImage } from '../components';

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

        {mdUp && <SectionImage />}

        <Container>
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
