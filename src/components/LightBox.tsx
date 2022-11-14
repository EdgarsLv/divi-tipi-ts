import React from 'react';
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from './Iconify';

type LightBoxProps = {
  isOpen: boolean;
  handleClose: () => void;
  images: string[];
  photoIndex: number;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
};

function LightBox({ isOpen, handleClose, images, photoIndex = 0, setPhotoIndex }: LightBoxProps) {
  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{ height: '100vh', backgroundColor: '#00000090' }}
    >
      <>
        <TopToolbar>
          <Typography variant='subtitle2'>{`${photoIndex + 1} / ${images.length}`}</Typography>
          <Stack direction='row' spacing={1}>
            <IconButton onClick={handleClose}>
              <Iconify icon='lucide:zoom-in' sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton onClick={handleClose}>
              <Iconify icon='lucide:zoom-out' sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton onClick={handleClose}>
              <Iconify icon='ri:close-circle-line' sx={{ color: '#fff' }} />
            </IconButton>
          </Stack>
        </TopToolbar>

        <PrevButton onClick={handlePrev}>
          <Iconify icon='ooui:next-rtl' sx={{ width: '30px', height: '30px', color: 'white' }} />
        </PrevButton>

        <NextButton onClick={handleNext}>
          <Iconify icon='ooui:next-ltr' sx={{ width: '30px', height: '30px', color: 'white' }} />
        </NextButton>

        <ImageBox>
          <img style={{ maxHeight: '90%' }} alt='random' src={images[photoIndex]} />
        </ImageBox>
      </>
    </Modal>
  );
}

export default LightBox;

const PrevButton = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 50,
  height: '100%',
  width: '50%',
  display: 'flex',
  backgroundColor: 'transparent',
  alignItems: 'center',
  cursor: 'pointer',
}));

const NextButton = styled(Box)(() => ({
  position: 'absolute',
  right: 0,
  top: 50,
  height: '100%',
  width: '50%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  cursor: 'pointer',
}));

const TopToolbar = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  padding: '0 10px',
  color: '#fff',
  //   backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const ImageBox = styled(Box)(() => ({
  height: 'calc(100% - 32px)',
  margin: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
