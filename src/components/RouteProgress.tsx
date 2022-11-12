import { Offset } from '@/layout/MainLayout';
import { Box, LinearProgress } from '@mui/material';
import { useNavigation } from 'react-router-dom';

function RouteProgress() {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === 'loading' && (
        // <Box
        //   sx={{
        //     position: 'fixed',
        //     inset: 0,
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     backgroundColor: 'rgba(0,0,0,0.5)',
        //   }}
        // >
        //   <CircularProgress color='primary' />
        // </Box>
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
          <Offset />
          <LinearProgress color='info' />
        </Box>
      )}
    </>
  );
}

export default RouteProgress;
