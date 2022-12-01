import { Iconify } from '@/components';
import { Link, Stack } from '@mui/material';

function LinkNav() {
  return (
    <Stack direction='row' spacing={3}>
      <Link
        underline='none'
        sx={{
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          '&.active': { color: 'primary.main' },
        }}
        href='/'
      >
        <Iconify icon='ic:baseline-people-outline' sx={{ mr: 0.5, color: 'text.primary' }} />
        Meklēt
      </Link>

      <Link
        underline='none'
        sx={{
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          '&.active': { color: 'primary.main' },
        }}
        href='/discussions'
      >
        <Iconify icon='bx:bx-chat' sx={{ mr: 0.5, color: 'text.primary' }} />
        Diskusijas
      </Link>
    </Stack>
  );
}

export default LinkNav;
