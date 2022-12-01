import { Box, Typography } from '@mui/material';

function SectionText() {
  return (
    <>
      <Box>
        <Typography variant='h2'>
          Divi
          <Typography component='span' variant='h2' sx={{ color: 'primary.dark' }}>
            &nbsp;Tipi
          </Typography>{' '}
          <br />
          jauns veids, kā iepazīties
        </Typography>
      </Box>
      <Box sx={{ mt: 3, color: 'text.secondary' }}>
        <Typography>Mēs zinām, ka atrast mīlestību var būt grūti,</Typography>
        <Typography>bet tā tam nav jābūt.</Typography>
      </Box>
    </>
  );
}

export default SectionText;
