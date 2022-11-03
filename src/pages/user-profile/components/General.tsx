import { Grid, Card, Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InfoField, InfoFromToField, InfoMapField } from './helpers';

const PreStyle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  margin: '16px',
  whiteSpace: 'pre-wrap',
  color: theme.palette.text.secondary,
}));

function General() {
  const TXT = 'Text, long text.\nAnother line text.';
  return (
    <Box>
      <Typography variant='h3' sx={{ mt: 2, mb: 1 }}>
        Anketa
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Card sx={{ p: { xs: 0, md: 2 } }}>
              <Typography variant='h5' sx={{ m: 2 }}>
                Vispārīga informācija
              </Typography>

              <InfoField id='sociotips' attribute='napoleons' />
              <InfoMapField id='mērķis portālā' attribute={['sex', 'iepazīties', 'izklaide']} />
            </Card>

            <Card sx={{ p: { xs: 0, md: 2 } }}>
              <Typography sx={{ m: 2 }} variant='subtitle1'>
                Saviem vārdiem
              </Typography>
              {TXT.split('\n').map((txt, i) => (
                <PreStyle key={i}>{txt}</PreStyle>
              ))}
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Card sx={{ p: { xs: 0, md: 2 } }}>
              <Typography variant='h5' sx={{ m: 2 }}>
                Prasības otrai pusītei
              </Typography>

              <InfoField id='sociotips' attribute='napoleons' />
              <InfoMapField id='mērķis portālā' attribute={['sex', 'iepazīties', 'izklaide']} />
              <InfoFromToField id='vecums' from='30' to='40' />
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default General;
