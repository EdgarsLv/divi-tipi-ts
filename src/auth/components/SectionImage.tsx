import { Image } from '@/components';
import { FONT_SECONDARY } from '@/theme/typography';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import loginImg from '../../assets/images/login.svg';

function SectionImage() {
  return (
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
  );
}

export default SectionImage;

export const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(15, 0, 2, 15),
}));

export const TypographyStyle = styled(Typography)(({ theme }) => ({
  textShadow: `2px 0 0 ${theme.palette.background.default}`,
  fontFamily: FONT_SECONDARY,
  fontWeight: 500,
}));
