import { Iconify } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';

function SocialAuth() {
  const theme = useTheme();
  const { signInWithProvider } = useAuth();

  const isDark = theme.palette.mode === 'dark';

  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction='row' justifyContent='flex-end' alignItems='center'>
        <Typography variant='body1' sx={{ mr: 'auto' }}>
          Izmanto:
        </Typography>
        <Button
          size='small'
          sx={{
            mr: 3,
            ...(isDark && {
              backgroundColor: 'black',
              color: 'white',
              '&: hover': { backgroundColor: '#0e0d0d' },
            }),
          }}
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='flat-color-icons:google' />}
          onClick={() => signInWithProvider('google')}
        >
          google
        </Button>
        <Button
          size='small'
          sx={{
            ...(isDark && {
              backgroundColor: 'black',
              color: 'white',
              '&: hover': { backgroundColor: '#0e0d0d' },
            }),
          }}
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='logos:facebook' />}
          onClick={() => signInWithProvider('facebook')}
        >
          facebook
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, fontSize: '14px' }}>VAI</Divider>
    </Stack>
  );
}

export default SocialAuth;
