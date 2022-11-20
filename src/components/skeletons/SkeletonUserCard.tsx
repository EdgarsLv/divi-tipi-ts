import { Stack, Skeleton, Grid, Card, Box } from '@mui/material';

export default function SkeletonUserCard() {
  return (
    <Grid item xs={10} sm={5} md={4}>
      <Card>
        <Skeleton sx={{ pt: '100%' }} animation='wave' variant='rectangular' />

        <Box sx={{ py: 0.5, px: 1 }}>
          <Stack direction='row'>
            <Skeleton variant='text' sx={{ mr: 2, width: 40 }} />
            <Skeleton variant='text' sx={{ width: 20 }} />
          </Stack>
          <Stack direction='row'>
            <Skeleton variant='text' sx={{ mr: 2, width: 50 }} />
            <Skeleton variant='text' sx={{ width: 15 }} />
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
}
