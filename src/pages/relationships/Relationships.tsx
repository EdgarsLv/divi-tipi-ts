import { Page } from '@/components';
import { RELATIONS } from '@/constants';
import { supabase } from '@/service';
import { Typography, Container, Grid } from '@mui/material';
import { RelationCard } from './components';

function Relationships() {
  return (
    <Page title='Relationships'>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          Starptipu attiecības
        </Typography>

        <Grid container spacing={3}>
          {RELATIONS.map((relation) => (
            <RelationCard key={relation.name} relation={relation} />
          ))}
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
