import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography, Link, Avatar } from '@mui/material';
import { Iconify, Image } from '@/components';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { useUserImages } from '@/hooks';

export default function ProfileCover() {
  const user = useLoaderData() as User;
  const navigate = useNavigate();
  const { cover, avatar } = useUserImages(user);
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
        <IconButton onClick={() => navigate(-1)}>
          <Iconify
            icon='akar-icons:arrow-back-thick'
            sx={{ color: 'primary.main', width: 24, height: 24 }}
          />
        </IconButton>
      </Stack>
      <InfoStyle>
        <Avatar
          variant='rounded'
          src={avatar}
          sx={{
            mx: 'auto',
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: 'primary.main',
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
            <Typography variant='h4'>{user.name}</Typography>
            <Typography variant='h4'> {user.age}</Typography>
          </Stack>
          <Typography sx={{ opacity: 0.9 }}>
            <Link href='/' sx={{ textTransform: 'capitalize' }}>
              {user.sociotype}
            </Link>
            <Link href='/'>D</Link>
          </Typography>

          <Typography variant='caption' sx={{ opacity: 0.82, fontSize: '10px' }}>
            Online: 2022.12.18
          </Typography>
        </Box>
      </InfoStyle>

      <Image
        alt='profile cover'
        src={cover}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
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
