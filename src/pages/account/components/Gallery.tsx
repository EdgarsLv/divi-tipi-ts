const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
import { MouseEventHandler, useState } from 'react';
import { Iconify, Image, LightBox } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Box, Card, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { removeAccountImages, selectAccountImages } from '@/redux/slices/accountSlice';
import { useImageUpload } from '@/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { GALLERY_SIZE } from '@/constants';

function Gallery() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const accountImages = useAppSelector(selectAccountImages);

  const { pickImage, uploading } = useImageUpload();

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = accountImages?.map((img) => `${storageUrl}/${img}`);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShow = (index: number) => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  const handleDeleteImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) => {
    e.stopPropagation();
    dispatch(removeAccountImages(accountImages, index, user?.id));
  };

  const showUploadButton = Boolean(!accountImages || accountImages?.length < GALLERY_SIZE);

  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Mani foto
      </Typography>

      <Card sx={{ p: 3, pt: 1, position: 'relative' }}>
        <Box sx={{ height: '50px' }}>
          {showUploadButton && (
            <label htmlFor='icon-file'>
              <Input
                disabled={uploading}
                accept='image/*'
                id='icon-file'
                type='file'
                onChange={(e) => pickImage(e, 'gallery')}
              />
              <IconButton sx={{ mb: 1 }} component='span'>
                <Iconify
                  icon='iconoir:add-media-image'
                  sx={{ color: 'text.primary', width: 24, height: 24 }}
                />
              </IconButton>
            </label>
          )}
        </Box>

        {uploading && (
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
          {images?.map((image, i) => (
            <GalleryItem
              key={i}
              image={image}
              handleDelete={(e) => handleDeleteImage(e, i)}
              handleOpen={() => handleShow(i)}
            />
          ))}
          {Boolean(images) && (
            <LightBox
              handleClose={handleClose}
              isOpen={isOpen}
              photoIndex={photoIndex}
              setPhotoIndex={setPhotoIndex}
              images={images}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
}

export default Gallery;

type ItemProps = {
  image: string;
  handleOpen: MouseEventHandler<HTMLDivElement>;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
};
function GalleryItem({ image, handleOpen, handleDelete }: ItemProps) {
  return (
    <Box onClick={handleOpen} sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt='gallery image' ratio='1/1' src={image} />

      <CaptionStyle>
        <Tooltip title='Dzēst' placement='top'>
          <IconButton onClick={handleDelete}>
            <Iconify
              icon='mdi:delete-forever-outline'
              sx={{ color: 'error.main', width: 25, height: 25 }}
            />
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

const Input = styled('input')({
  display: 'none',
});
