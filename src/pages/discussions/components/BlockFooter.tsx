import { Iconify } from '@/components';
import { Stack, Typography, useTheme } from '@mui/material';

type Props = {
  comments: number | null;
  views: number | null;
  users: number | null;
};

function BlockFooter({ comments, views, users }: Props) {
  const theme = useTheme();
  return (
    <>
      <Stack direction='row'>
        <Iconify sx={{ color: theme.palette.primary.main }} icon={'humbleicons:chats'} />
        <Typography sx={{ color: theme.palette.primary.main }} ml='5px' variant='caption'>
          {comments}
        </Typography>
      </Stack>
      <Stack sx={{ pl: 2 }} direction='row'>
        <Iconify sx={{ color: theme.palette.primary.main }} icon={'akar-icons:eye-open'} />
        <Typography sx={{ color: theme.palette.primary.main }} ml='5px' variant='caption'>
          {views}
        </Typography>
      </Stack>
      <Stack sx={{ pl: 2 }} direction='row'>
        <Iconify sx={{ color: theme.palette.primary.main }} icon={'mdi:account-group-outline'} />
        <Typography sx={{ color: theme.palette.primary.main }} ml='5px' variant='caption'>
          {users}
        </Typography>
      </Stack>
    </>
  );
}

export default BlockFooter;
