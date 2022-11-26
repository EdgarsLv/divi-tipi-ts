import { Iconify } from '@/components';
import { Stack, Typography } from '@mui/material';

type Props = {
  comments: number | null;
  views: number | null;
  users: number | null;
};

function Counters({ comments, views, users }: Props) {
  return (
    <>
      <Stack direction='row'>
        <Iconify icon={'humbleicons:chats'} />
        <Typography ml='5px' variant='caption'>
          {comments}
        </Typography>
      </Stack>
      <Stack sx={{ pl: 2 }} direction='row'>
        <Iconify icon={'akar-icons:eye-open'} />
        <Typography ml='5px' variant='caption'>
          {views}
        </Typography>
      </Stack>
      <Stack sx={{ pl: 2 }} direction='row'>
        <Iconify icon={'mdi:account-group-outline'} />
        <Typography ml='5px' variant='caption'>
          {users}
        </Typography>
      </Stack>
    </>
  );
}

export default Counters;
