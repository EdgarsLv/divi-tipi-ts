import { Stack, Skeleton, Card } from '@mui/material';

function SkeletonDiscussion() {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <Stack spacing={2} direction='row' sx={{ flexGrow: 1 }}>
        <Skeleton variant='rectangular' sx={{ height: 50, width: 50 }} />
        <Skeleton variant='text' sx={{ width: 120, height: 24 }} />
      </Stack>

      <Stack spacing={1} sx={{ mt: 2, flexGrow: 1 }}>
        <Skeleton variant='text' sx={{ width: 0.6, height: 20 }} />
        <Skeleton variant='text' sx={{ width: 0.75, height: 16 }} />
      </Stack>

      <Stack spacing={1} sx={{ mt: 2, flexGrow: 1 }}>
        <Skeleton variant='text' sx={{ width: 0.45, height: 16 }} />
        <Skeleton variant='text' sx={{ width: 0.95, height: 14 }} />
      </Stack>
    </Card>
  );
}

export default SkeletonDiscussion;
