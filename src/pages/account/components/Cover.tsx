import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Stack, IconButton, Link, CircularProgress, Paper } from '@mui/material';
import { Iconify, Image, LinkToPersonality } from '@/components';
import Avatar from './Avatar';
import { useImageUpload, useUserImages } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { removeAccountAvatar, selectAccountData } from '@/redux/slices/accountSlice';

function Cover() {
  const account = useAppSelector(selectAccountData);
  const dispatch = useAppDispatch();

  const { coverUrl, uploading, pickImage } = useImageUpload();
  const { cover, hasAvatar } = useUserImages(account);

  const handleDeleteAvatar = () => {
    dispatch(removeAccountAvatar(account.id));
  };

  return (
    <Box>
      <TopStack direction='row'>
        <label htmlFor='cover-file'>
          <Input
            disabled={uploading}
            accept='image/*'
            id='cover-file'
            type='file'
            onChange={(e) => pickImage(e, 'cover')}
          />
          <IconButton component='span'>
            <Iconify
              icon='dashicons:cover-image'
              sx={{ color: 'primary.main', width: 24, height: 24 }}
            />
          </IconButton>
        </label>
        {uploading && (
          <Box sx={{ position: 'absolute', top: '16px', right: '24px' }}>
            <CircularProgress />
          </Box>
        )}
      </TopStack>

      <InfoStyle>
        <Box sx={{ position: 'relative' }}>
          {hasAvatar && (
            <PaperButton elevation={3} onClick={handleDeleteAvatar}>
              <Iconify icon='mdi:delete-circle-outline' sx={{ width: 25, height: 25 }} />
            </PaperButton>
          )}
          <Avatar />
        </Box>

        <Box sx={{ ml: { xs: 1, md: 3 }, mt: { xs: 1, md: 0 }, textAlign: 'left' }}>
          <Typography variant='h4'>{account.name}</Typography>

          <Box>
            <LinkToPersonality
              confirmed={account.confirmed_sociotype}
              sx={{ color: 'text.primary' }}
              personality={account.sociotype}
            />
            <Link
              color='text.primary'
              underline='always'
              ml={1}
              variant='overline'
              href='/personalities/test'
            >
              Sociotipa tests
            </Link>
          </Box>
        </Box>
      </InfoStyle>
      <Image
        alt='account cover'
        src={coverUrl ? coverUrl : cover}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </Box>
  );
}

export default Cover;
// STYLES ----------------------------------------------------------------------
const TopStack = styled(Stack)(() => ({
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 100,
  padding: '16px 24px',
  justifyContent: 'flex-end',
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

const Input = styled('input')({
  display: 'none',
});

const PaperButton = styled(Paper)(() => ({
  position: 'absolute',
  alignItems: 'center',
  borderRadius: '50%',
  display: 'flex',
  top: -15,
  right: -15,
  zIndex: 10,
  padding: '2px',
  cursor: 'pointer',
}));
