import { User } from '@/types';
import { Card, Grid, Stack, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InfoFromToField, InfoMapField } from './helpers';

function Preferences({ user }: { user: User }) {
  return (
    <Grid item xs={12} md={6}>
      <Stack spacing={3}>
        <Card sx={{ p: { xs: 0, md: 2 } }}>
          <Typography variant='h5' sx={{ m: 2 }}>
            Prasības otrai pusītei
          </Typography>

          <InfoMapField id='dzimums' attribute={user?.search?.gender} />
          <InfoFromToField id='vecums' from={user?.search?.minAge} to={user?.search?.maxAge} />
          <InfoFromToField
            id='augums'
            from={user?.search?.minLength}
            to={user?.search?.maxLength}
          />
          <InfoMapField id='ķermeņa uzbūve' attribute={user?.search?.body} />
          <InfoMapField id='izglītība' attribute={user?.search?.education} />
          <InfoMapField id='alkohola patēriņš' attribute={user?.search?.alcohol} />
          <InfoMapField id='smēķēšana' attribute={user?.search?.smoke} />
          <InfoMapField id='mērķis portālā' attribute={user?.search?.goals} />
          <InfoMapField id='bērni' attribute={user?.search?.kids} />
          <InfoMapField id='saziņas valoda' attribute={user?.search?.language} />
          <InfoMapField id='horoskops' attribute={user?.search?.horoscope} />
          <InfoMapField id='sociotips' attribute={user?.search?.sociotips} />

          {Boolean(user?.search?.about) && (
            <Box>
              <Divider />
              <Typography sx={{ mt: 1, ml: 2 }} variant='h6'>
                Saviem vārdiem
              </Typography>
              {user?.search?.about.split('\n').map((txt, i) => (
                <PreStyle key={i}>{txt}</PreStyle>
              ))}
            </Box>
          )}
        </Card>
      </Stack>
    </Grid>
  );
}

export default Preferences;

const PreStyle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  margin: '16px',
  whiteSpace: 'pre-wrap',
  textAlign: 'justify',
  color: theme.palette.text.secondary,
}));
