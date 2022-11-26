import { Stack, Skeleton, Grid, Card, Box } from '@mui/material';

function SkeletonUserCard() {
  return (
    <Grid item xs={10} sm={5} md={4}>
      <Card>
        <Skeleton sx={{ pt: '100%' }} animation='wave' variant='rectangular' />

        <Box sx={{ py: 0.5, px: 1 }}>
          <Stack direction='row'>
            <Skeleton variant='text' sx={{ mr: 2, width: 45 }} />
          </Stack>
          <Stack direction='row'>
            <Skeleton variant='text' sx={{ mr: 2, width: 60 }} />
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
}

export default SkeletonUserCard;
