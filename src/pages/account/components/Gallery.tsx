import { useState } from 'react';
import { Iconify, Image, LightBox } from '@/components';
import { useAppSelector } from '@/redux/store';
import { Box, Card, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { selectAccountImages } from '@/redux/slices/accountSlice';

const Input = styled('input')({
  display: 'none',
});

function Gallery() {
  const imagesList = useAppSelector(selectAccountImages);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = [
    'https://dm.henkel-dam.com/is/image/henkel/men_perfect_com_thumbnails_home_pack_400x400-wcms-international?scl=1&fmt=jpg',
    'https://thumbs.dreamstime.com/z/handsome-young-man-getting-out-water-wet-hair-attractive-sea-looking-away-to-side-90791720.jpg',
    'https://thumbs.dreamstime.com/b/handsome-young-man-getting-out-water-wet-hair-attractive-young-man-sea-getting-out-water-wet-hair-looking-107451173.jpg',
    'https://media-s3-us-east-1.ceros.com/forbes/images/2021/12/06/bbff530cddcb7ed1b79ecee931f9f854/artboard-2-copy-6.jpg',
    'https://static01.nyt.com/images/2019/11/17/books/review/17Salam/Salam1-superJumbo.jpg',
  ];
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShow = (index: number) => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Mani foto
      </Typography>

      <Card sx={{ p: 3, pt: 1, position: 'relative' }}>
        <Box sx={{ height: '50px' }}>
          {true && (
            <label htmlFor='icon-file'>
              <Input accept='image/*' id='icon-file' type='file' onChange={(e) => console.log(e)} />
              <IconButton sx={{ mb: 1 }} component='span'>
                <Iconify
                  icon='iconoir:add-media-image'
                  sx={{ color: 'text.primary', width: 24, height: 24 }}
                />
              </IconButton>
            </label>
          )}
        </Box>

        {false && (
          <Box sx={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
            <LinearProgress />
          </Box>
        )}
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {images.map((image, i) => (
            <Box sx={{ cursor: 'pointer' }} key={i}>
              <img alt='llddlld' src={image} onClickCapture={() => handleShow(i)} />
            </Box>
          ))}

          <LightBox
            handleClose={handleClose}
            isOpen={isOpen}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
            images={images}
          />
        </Box>
      </Card>
    </Box>
  );
}

export default Gallery;

function GalleryItem({ image }: { image: string }) {
  // const onSetProfileImage = async (path) => {
  //   const update = {
  //     avatar: path,
  //     updated_at: new Date(),
  //   };
  //   await supabase.from('users').update({ avatarImage: update }).match({ id });
  // };

  return (
    <Box sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt='gallery image' ratio='1/1' src={image} />

      <CaptionStyle>
        {/* <Tooltip title="Profila foto" placement="top">
          <IconButton onClick={() => onSetProfileImage(image.path)} color="inherit">
            <Iconify icon={'ic:outline-photo-camera-front'} width={24} height={24} />
          </IconButton>
        </Tooltip> */}
        <Tooltip title='Dzēst' placement='top'>
          <IconButton onClick={() => console.log('delete')} color='error'>
            <Iconify icon={'ic:outline-delete'} />
          </IconButton>
        </Tooltip>
      </CaptionStyle>
    </Box>
  );
}

// STYLES ----------------------------------------------------------------------
const CaptionStyle = styled(Box)(({ theme }) => ({
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));
