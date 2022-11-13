import { styled } from '@mui/material/styles';
import { Box, Typography, Stack, IconButton, Link, CircularProgress } from '@mui/material';
import { Iconify, Image } from '@/components';
import Avatar from './Avatar';
import { useImageUpload, useUserImages } from '@/hooks';
import { useAppSelector } from '@/redux/store';
import { selectAccountData } from '@/redux/slices/accountSlice';

export default function Cover() {
  const account = useAppSelector(selectAccountData);
  const { coverUrl, pickImage } = useImageUpload();
  const { cover } = useUserImages(account);

  return (
    <RootStyle>
      <Stack
        justifyContent='flex-end'
        direction='row'
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 24px',
        }}
      >
        <label htmlFor='cover-file'>
          <Input
            accept='image/*'
            id='cover-file'
            type='file'
            onChange={(e) => pickImage(e, 'cover')}
          />
          <IconButton component='span'>
            <Iconify
              icon='dashicons:cover-image'
              sx={{
                width: 24,
                height: 24,
              }}
            />
          </IconButton>
        </label>
        {false && (
          <Box sx={{ position: 'absolute', top: '16px', right: '24px' }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>

      <InfoStyle>
        <Box sx={{ position: 'relative' }}>
          {true && (
            <IconButton
              onClick={() => console.log('delete')}
              sx={{ zIndex: 10, position: 'absolute', top: '-20px', right: '-20px' }}
            >
              <Iconify
                icon='clarity:remove-line'
                sx={{
                  backgroundColor: '#161C24',
                  borderRadius: '50%',
                  color: 'red',
                  width: { xs: 25, md: 30 },
                  height: { xs: 25, md: 30 },
                }}
              />
            </IconButton>
          )}
          <Avatar />
        </Box>

        <Box
          sx={{
            ml: { xs: 1, md: 3 },
            mt: { xs: 1, md: 0 },

            textAlign: 'left',
          }}
        >
          <Typography variant='h4'>Edgars</Typography>

          <Typography sx={{ textTransform: 'capitalize' }}>
            draizers
            <LinkStyle underline='always' ml={2} variant='overline' href='/personalities/test'>
              Sociotipa tests
            </LinkStyle>
          </Typography>
        </Box>
      </InfoStyle>
      <Image
        alt='account cover'
        src={coverUrl ? coverUrl : cover}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}

// STYLES ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to bottom, #ffffff30, #ffffff)',
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

const Input = styled('input')({
  display: 'none',
});

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  // padding: '0 5px',
}));

// const DeleteAvatarButton = styled(IconButton)(({ theme }) => ({
//   position: 'absolute',
//   bottom: 0,
//   left: '51%',
//   [theme.breakpoints.up('md')]: {
//     left: 0,
//   },
// }));
