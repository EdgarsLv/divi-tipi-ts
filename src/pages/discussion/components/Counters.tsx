import { Iconify } from '@/components';
import { Discussion } from '@/types';
import { Stack, Typography } from '@mui/material';

function Counters({ discussion }: { discussion: Discussion | null }) {
  return (
    <Stack direction='row'>
      <Stack sx={{ pl: 1, mt: 1 }} direction='row'>
        <Iconify icon={'humbleicons:chats'} />
        <Typography ml='5px' variant='caption'>
          {discussion?.comments_count}
        </Typography>
      </Stack>
      <Stack sx={{ pl: 2, mt: 1 }} direction='row'>
        <Iconify icon={'akar-icons:eye-open'} />
        <Typography ml='5px' variant='caption'>
          {discussion?.views_count}
        </Typography>
      </Stack>
      <Stack sx={{ pl: 2, mt: 1 }} direction='row'>
        <Iconify icon={'mdi:account-group-outline'} />
        <Typography ml='5px' variant='caption'>
          {discussion?.users_count}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Counters;
