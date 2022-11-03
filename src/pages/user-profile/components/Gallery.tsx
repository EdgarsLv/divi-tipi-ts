import { Image } from '@/components';
import { Box, Card, LinearProgress, Typography } from '@mui/material';

const IMAGES: string[] = [
  'https://eit.europa.eu/sites/default/files/cristina_aleixendri_portrait_-_vertical_0.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsrbJG6gMZ1o6wS97zmIdYiZ8bBBZ2Ucuqaw&usqp=CAU',
];

export default function Gallery() {
  const loading = false;
  return (
    <Box>
      <Typography variant='h3' sx={{ mt: 2, mb: 1 }}>
        Galerija
      </Typography>

      <Card sx={{ p: 3, position: 'relative' }}>
        {loading && (
          <Box sx={{ position: 'absolute', top: 0, right: 0, left: 0 }}>
            <LinearProgress />
          </Box>
        )}
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {IMAGES.map((image, i) => (
            <GalleryItem key={i} image={image} />
          ))}
        </Box>

        {/* <LightboxModal
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        /> */}
      </Card>
    </Box>
  );
}

// ----------------------------------------------------------------------

function GalleryItem({ image }: { image: string }) {
  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image ratio='1/1' src={image} />
    </Card>
  );
}
