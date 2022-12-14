import { Image, Logo, Page } from '../../components';
import { styled } from '@mui/material/styles';
import { Box, Typography, Link, Container } from '@mui/material';
import notFoundImg from '../../assets/images/notfound.svg';

function NotFound() {
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
                Norādītā adrese netika atrasta!
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              Izskatās, ka jūsu meklētā adrese nav atrasta. Atgriezieties{' '}
              <Link href='/'>divitipi.lv</Link>
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Image alt='not found' src={notFoundImg} />
            </Box>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default NotFound;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));
