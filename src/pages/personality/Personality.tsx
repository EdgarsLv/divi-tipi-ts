import { useEffect } from 'react';
import { Page } from '@/components';
import { Card, Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { RenderTextArray } from '@/components/RenderTextArray';
import { supabase } from '@/service';

export type Data = {
  id: string;
  description: string[] | null;
};

function Personality() {
  const { description, id } = useLoaderData() as Data;

  useEffect(() => {
    const increaseCount = async () => {
      await supabase.rpc('sociotype_views_count', { soctp: id });
    };
    increaseCount();
  }, [id]);

  return (
    <Page title={id.toUpperCase()}>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ my: 2 }}>
          {id}
        </Typography>

        <Card sx={{ p: 3 }}>
          <RenderTextArray items={description} />
        </Card>
      </Container>
    </Page>
  );
}
export default Personality;
