import { Stack, Skeleton, Card } from '@mui/material';

export default function SkeletonComments() {
  return (
    <Card sx={{ p: 2 }}>
      <Stack spacing={2} direction='row' sx={{ flexGrow: 1 }}>
        <Skeleton variant='rectangular' sx={{ height: 50, width: 50 }} />
        <Skeleton variant='text' sx={{ width: 120, height: 24 }} />
      </Stack>

      <Stack spacing={1} sx={{ mt: 2, flexGrow: 1 }}>
        <Skeleton variant='text' sx={{ width: 0.6, height: 20 }} />
        <Skeleton variant='text' sx={{ width: 0.75, height: 20 }} />
      </Stack>

      <Stack spacing={1} sx={{ mt: 2, flexGrow: 1 }}>
        <Skeleton variant='text' sx={{ width: 0.45, height: 16 }} />
        <Skeleton variant='text' sx={{ width: 0.95, height: 14 }} />
        <Skeleton variant='text' sx={{ width: 0.8, height: 12 }} />
        <Skeleton variant='text' sx={{ width: 0.7, height: 15 }} />
      </Stack>

      <Stack spacing={1} sx={{ mt: 5, flexGrow: 1 }}>
        <Stack spacing={2} direction='row' sx={{ flexGrow: 1 }}>
          <Skeleton variant='rectangular' sx={{ height: 50, width: 50 }} />
          <Skeleton variant='text' sx={{ width: 130, height: 20 }} />
        </Stack>
        <Skeleton variant='text' sx={{ width: 0.9, height: 15 }} />
        <Skeleton variant='text' sx={{ width: 0.85, height: 13 }} />
        <Skeleton variant='text' sx={{ width: 0.65, height: 14 }} />
      </Stack>

      <Stack spacing={1} sx={{ mt: 5, flexGrow: 1 }}>
        <Stack spacing={2} direction='row' sx={{ flexGrow: 1 }}>
          <Skeleton variant='rectangular' sx={{ height: 50, width: 50 }} />
          <Skeleton variant='text' sx={{ width: 110, height: 20 }} />
        </Stack>
        <Skeleton variant='text' sx={{ width: 0.85, height: 15 }} />
        <Skeleton variant='text' sx={{ width: 0.75, height: 14 }} />
        <Skeleton variant='text' sx={{ width: 0.95, height: 13 }} />
        <Skeleton variant='text' sx={{ width: 0.85, height: 14 }} />
      </Stack>
    </Card>
  );
}
