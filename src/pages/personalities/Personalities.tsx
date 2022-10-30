import { Page } from '@/components';
import { Typography, Container, Grid } from '@mui/material';
import { supabase } from '@/service';
import { PERSONALITIES } from '@/assets/personalities/sociotypes';
import { PersonalityCard } from './components';

function Personalities() {
  return (
    <Page title='Personalities'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Personalities
        </Typography>
        <Grid container spacing={3}>
          {PERSONALITIES.map((x) => (
            <PersonalityCard key={x.name} personality={x} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

export default Personalities;

export async function personalityLoader(name?: string) {
  const { data, error } = await supabase
    .from('sociotypes')
    .select('*')
    .eq('id', name)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}
