import { useState } from 'react';
import { Page } from '@/components';
import { Container, Typography, Box } from '@mui/material';
import { supabase } from '@/service';
import { About, Stepper } from './components';

function IqTest() {
  const [start, setStart] = useState(false);

  return (
    <Page title='Iq - tests'>
      <Container>
        <Typography variant='h3' sx={{ my: 2 }}>
          Iq - tests
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: start ? 'center' : 'flex-start' }}>
          {start ? <Stepper /> : <About setStart={setStart} />}
        </Box>
      </Container>
    </Page>
  );
}

export default IqTest;

export async function exerciseLoader() {
  const { data, error } = await supabase
    .from('iq_tests')
    .select('picking_img, exercise_img')
    .order('id');

  if (error) {
    throw error;
  }
  return data;
}
