import { User } from '@/types';
import { Card, Grid, Stack, Typography, Box, Divider } from '@mui/material';
import { InfoField, InfoMapField } from './helpers';
import { styled } from '@mui/material/styles';

function Information({ user }: { user: User }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack spacing={3}>
        <Card sx={{ p: { xs: 0, md: 2 } }}>
          <Typography variant='h5' sx={{ m: 2 }}>
            Vispārīga informācija
          </Typography>

          <InfoField id='dzimums' attribute={user?.gender} />
          <InfoField id='vecums' attribute={user?.age} />
          <InfoField id='pilsēta' attribute={user?.user?.city} />
          <InfoField id='garums' attribute={user?.user?.length} />
          <InfoField id='ķermeņa uzbūve' attribute={user?.user?.body} />
          <InfoField id='smēķēšana' attribute={user?.user?.smoke} />
          <InfoField id='alkohola patēriņš' attribute={user?.user?.alcohol} />
          <InfoField id='izglītība' attribute={user?.user?.education} />
          <InfoField id='bērni' attribute={user?.user?.kids} />
          <InfoField id='horoskops' attribute={user?.user?.horoscope} />
          <InfoField id='sociotips' attribute={user?.sociotype} />
          <InfoMapField id='mērķis portālā' attribute={user?.user?.goals} />

          {Boolean(user?.user?.about) && (
            <Box>
              <Divider />
              <Typography sx={{ mt: 1, ml: 2 }} variant='h6'>
                Saviem vārdiem
              </Typography>
              {user?.user?.about.split('\n').map((txt, i) => (
                <PreStyle key={i}>{txt}</PreStyle>
              ))}
            </Box>
          )}
        </Card>
      </Stack>
    </Grid>
  );
}

export default Information;

const PreStyle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  margin: '16px',
  whiteSpace: 'pre-wrap',
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));
