import { Box, Typography } from '@mui/material';

function SectionText() {
  return (
    <>
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
      <Box sx={{ mt: 3 }}>
        <Typography>Mēs zinām, ka atrast mīlestību var būt grūti,</Typography>
        <Typography>bet tā tam nav jābūt.</Typography>
      </Box>
    </>
  );
}

export default SectionText;
