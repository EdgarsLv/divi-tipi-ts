import { Image, Logo, Page } from '../../components';
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Button } from '@mui/material';
import errorImg from '../../assets/images/error.svg';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
    window.location.reload();
  };
  return (
    <Page title='404'>
      <RootStyle>
        <Container>
          <Box sx={{ position: 'absolute', top: 24 }}>
            <Logo sx={{ width: 30 }} />
          </Box>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Box>
              <Typography variant='h3' paragraph>
                Kaut kas nogāja greizi!
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              Izskatās, ka lapā notikusi kļūda. Atgriezieties{' '}
              <Button sx={{ textTransform: 'lowercase' }} onClick={handleHome}>
                divitipi.lv
              </Button>
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Image alt='not found' src={errorImg} />
            </Box>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default ErrorPage;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));
