import { Iconify } from '@/components';
import { Button, Divider, Stack, Typography } from '@mui/material';

function SocialButtons({ title }: { title: string }) {
  return (
    <Stack sx={{ mb: 2 }}>
      <Typography variant='h3' sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Stack direction='row' justifyContent='flex-end' alignItems='center'>
        <Typography variant='h5' sx={{ mr: 'auto' }}>
          Izmanto:
        </Typography>
        <Button
          size='small'
          sx={{ mr: 3 }}
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='flat-color-icons:google' />}
        >
          google
        </Button>
        <Button
          size='small'
          variant='contained'
          color='inherit'
          startIcon={<Iconify icon='logos:facebook' />}
        >
          facebook
        </Button>
      </Stack>
      <Divider sx={{ mt: 2, fontSize: '14px' }}>VAI</Divider>
    </Stack>
  );
}

export default SocialButtons;
