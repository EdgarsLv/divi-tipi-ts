import { Page } from '@/components';
import { Typography, Container, Grid } from '@mui/material';
import { supabase } from '@/service';
import { PersonalityCard } from './components';
import { useLoaderData } from 'react-router-dom';
import { Personality } from '@/types';

function Personalities() {
  const personalities = useLoaderData() as Personality[];

  return (
    <Page title='Sociotipi'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Sociotipi
        </Typography>
        <Grid container spacing={3}>
          {personalities.map((pers) => {
            if (pers.id === 'nenoteikts') {
              return null;
            }
            return <PersonalityCard key={pers.id} personality={pers} />;
          })}
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

export async function personalitiesLoader() {
  const { data, error } = await supabase
    .from('sociotypes')
    .select('id, views, caption, image')
    .order('id');

  if (error) {
    throw error;
  }
  return data;
}
