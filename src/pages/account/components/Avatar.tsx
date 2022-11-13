/* eslint-disable jsx-a11y/label-has-associated-control */
import { Iconify, Image } from '@/components';
import { Card, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useImageUpload, useUserImages } from '@/hooks';
import { useAppSelector } from '@/redux/store';
import { selectAccountData } from '@/redux/slices/accountSlice';

function Avatar() {
  const account = useAppSelector(selectAccountData);
  const { pickImage, avatarUrl } = useImageUpload();
  const { avatar } = useUserImages(account);

  const hasAvatar = true;

  return (
    <Card
      sx={{
        mx: 'auto',
        position: 'relative',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'common.white',
        width: { xs: 90, md: 120 },
        height: { xs: 90, md: 120 },
      }}
    >
      <DropZoneStyle>
        {hasAvatar && (
          <Image alt='avatar' src={avatarUrl ? avatarUrl : avatar} sx={{ zIndex: 8 }} />
        )}

        <PlaceholderStyle
          className='placeholder'
          sx={{
            opacity: 0.62,
            color: 'common.white',
            '&:hover': { opacity: 0.72 },
          }}
        >
          <label
            style={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
            htmlFor='avatar-file'
          >
            <Input
              accept='image/*'
              id='avatar-file'
              type='file'
              onChange={(e) => pickImage(e, 'avatar')}
            />
            <IconButton disableRipple component='span'>
              <Iconify
                icon='ic:round-add-a-photo'
                sx={{ color: 'common.white', width: 24, height: 24 }}
              />
            </IconButton>
          </label>
        </PlaceholderStyle>
      </DropZoneStyle>
    </Card>
  );
}

export default Avatar;

const Input = styled('input')({
  display: 'none',
});

const DropZoneStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
}));

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}));
