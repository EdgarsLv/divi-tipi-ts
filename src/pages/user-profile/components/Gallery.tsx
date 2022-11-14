import { Image } from '@/components';
import { Box, Card, Typography } from '@mui/material';

type Props = {
  handleOpen: (index: number) => void;
  images: string[];
};

export default function Gallery({ handleOpen, images }: Props) {
  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Galerija
      </Typography>

      <Card sx={{ p: 3, position: 'relative' }}>
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
          {images.map((image, index) => (
            <Card
              key={index}
              onClick={() => handleOpen(index)}
              sx={{ cursor: 'pointer', position: 'relative' }}
            >
              <Image ratio='1/1' src={image} />
            </Card>
          ))}

          {!images.length && (
            <Box>
              <Typography variant='subtitle1' mb={1}>
                Šeit nekā nav!{' '}
              </Typography>
              <Image
                ratio='1/1'
                alt='Nekā nav'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqHmGErNgGVx-RCYkeKLQL083vXz7KyCIyCaAd7nRbeuMmn8mTDgFFyEpUCaOW4_n_NWc&usqp=CAU'
              />
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
}
