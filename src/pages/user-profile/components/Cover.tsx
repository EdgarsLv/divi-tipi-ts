import { styled, alpha } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography, Avatar } from '@mui/material';
import { Iconify, Image, LinkToPersonality, LinkToRelations } from '@/components';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { useUserImages } from '@/hooks';
import { useAppDispatch } from '@/redux/store';
import { setIsOpen } from '@/redux/slices/usersSlice';

export default function ProfileCover() {
  const user = useLoaderData() as User;
  const navigate = useNavigate();
  const { cover, avatar, hasAvatar } = useUserImages(user);

  const dispatch = useAppDispatch();

  return (
    <Box>
      <TopStack direction='row'>
        <IconButton onClick={() => navigate(-1)}>
          <Iconify icon='icon-park-twotone:back' sx={{ width: 24, height: 24 }} />
        </IconButton>
      </TopStack>
      <InfoStyle>
        <Avatar
          onClick={() => dispatch(setIsOpen(true))}
          src={avatar}
          sx={{
            mx: 'auto',
            cursor: 'pointer',
            width: { xs: 90, md: 128 },
            height: { xs: 90, md: 128 },
            pointerEvents: hasAvatar ? 'all' : 'none',
          }}
        />
        <Box
          sx={{
            ml: { xs: 2, md: 3 },
            mt: { xs: 1, md: -1 },
            textAlign: 'left',
          }}
        >
          <Stack direction='row'>
            <Typography mr={1} variant='h4'>
              {user.name}
            </Typography>
            <Typography variant='h4'> {user.age}</Typography>
          </Stack>
          <Box>
            <LinkToPersonality sx={{ color: 'text.primary' }} personality={user.sociotype} />
            <LinkToRelations personality={user.sociotype} />
          </Box>

          <Typography variant='caption' sx={{ fontSize: '10px' }}>
            Online: 2022.12.18
          </Typography>
        </Box>
      </InfoStyle>

      <Image
        alt='profile cover'
        src={cover}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </Box>
  );
}

const TopStack = styled(Stack)(() => ({
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  zIndex: 111,
  padding: '20px 16px',
  width: '100%',
  justifyContent: 'flex-start',
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(2),

  backdropFilter: 'blur( 5px )',
  padding: theme.spacing(0.5, 2, 0.5, 0.5),
  backgroundColor: alpha(theme.palette.background.paper, 0.65),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor:
    theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black,

  [theme.breakpoints.up('xs')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(1),
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
