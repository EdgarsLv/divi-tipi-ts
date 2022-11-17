import { Page } from '@/components';
import { supabase } from '@/service';
import { Typography, Container, Grid } from '@mui/material';
import { RelationCard } from './components';
import { useLoaderData } from 'react-router-dom';
import { Relations } from '@/types';

function Relationships() {
  const relations = useLoaderData() as Relations[];

  return (
    <Page title='Saderības'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Starptipu attiecības
        </Typography>

        <Grid container spacing={3}>
          {relations.map((relation) => {
            if (relation.id === 'nenoteikts') {
              return null;
            }
            return <RelationCard key={relation.id} relation={relation} />;
          })}
        </Grid>
      </Container>
    </Page>
  );
}

export default Relationships;

export async function relationLoader(name?: string) {
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .eq('id', name)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}

export async function relationshipLoader() {
  const { data, error } = await supabase
    .from('relationships')
    .select('id, views, caption, short')
    .order('id');

  if (error) {
    throw error;
  }
  return data;
}
