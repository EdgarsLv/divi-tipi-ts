import { User } from '@/types';
import { Grid, Typography, Box } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import Information from './Information';
import Preferences from './Preferences';

function General() {
  const user = useLoaderData() as User;

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Anketa
      </Typography>
      <Grid container spacing={3}>
        <Information user={user} />
        <Preferences user={user} />
      </Grid>
    </Box>
  );
}

export default General;
