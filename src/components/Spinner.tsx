import { CircularProgress, Box } from '@mui/material';

function Spinner() {
  return (
    <Box
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color='primary' />
    </Box>
  );
}

export default Spinner;
