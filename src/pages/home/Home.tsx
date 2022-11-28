import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';
import { FONT_SECONDARY } from './../../../../divitipi_prod/src/theme/typography';
import { Image, LogoWithText } from '@/components';
import { LoginForm } from '@/auth/login/components';
import loginImg from '../../assets/images/login.svg';

function Home() {
  return (
    <>
      <ContentStyle spacing={4}>
        <LogoWithText />
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

        <Box>
          <TypographyStyle>Mēs zinām, ka atrast mīlestību var būt grūti,</TypographyStyle>
          <TypographyStyle>bet tā tam nav jābūt.</TypographyStyle>
        </Box>
      </ContentStyle>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Image sx={{ width: 300 }} alt='login' src={loginImg} />
        <Box sx={{ width: '50%', maxWidth: 400 }}>
          <Typography sx={{ mb: 4 }}>Pievienoties</Typography>
          <LoginForm />
        </Box>
      </Box>
    </>
  );
}

export default Home;

const ContentStyle = styled(Stack)(({ theme }) => ({
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  padding: theme.spacing(2, 5),

  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
  textShadow: `2px 0 0 ${theme.palette.background.default}`,
  fontFamily: FONT_SECONDARY,
  fontWeight: 500,
}));
