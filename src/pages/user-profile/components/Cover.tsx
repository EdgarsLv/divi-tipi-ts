import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography, Link, Avatar } from '@mui/material';
import { Iconify } from '@/components';

export default function ProfileCover() {
  return (
    <RootStyle>
      <Stack
        width='100%'
        justifyContent='flex-start'
        direction='row'
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          zIndex: 111,
          padding: '20px 16px',
        }}
      >
        <IconButton>
          <Iconify
            icon='akar-icons:arrow-back-thick'
            sx={{ color: 'common.white', width: 24, height: 24 }}
          />
        </IconButton>
      </Stack>
      <InfoStyle>
        <Avatar
          variant='rounded'
          sx={{
            mx: 'auto',
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 90, md: 128 },
            height: { xs: 90, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { xs: 2, md: 3 },
            mt: { xs: 1, md: -1 },
            color: 'common.white',
            textAlign: 'left',
          }}
        >
          <Stack direction='row'>
            <Typography variant='h4'>Edgars</Typography>
            <Typography variant='h4'> 40</Typography>
          </Stack>
          <Typography sx={{ opacity: 0.9 }}>
            <Link href='/' sx={{ textTransform: 'capitalize' }}>
              draizers
            </Link>
            <Link href='/'>D</Link>
          </Typography>

          <Typography variant='caption' sx={{ opacity: 0.82, fontSize: '10px' }}>
            Online: 2022.12.18
          </Typography>
        </Box>
      </InfoStyle>

      <img
        alt='profile cover'
        src='https://www.pixelstalk.net/wp-content/uploads/2016/06/Abstract-Backgrounds-HD.jpg'
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}

const RootStyle = styled('div')(() => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    // eslint-disable-next-line quotes
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('xs')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(7),
  },
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));
