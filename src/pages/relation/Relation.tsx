import { useEffect } from 'react';
import { Page } from '@/components';
import { RenderTextArray } from '@/components/RenderTextArray';
import { supabase } from '@/service';
import { Card, Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

export type Data = {
  id: string;
  description: string[] | null;
};

function Relation() {
  const { description, id } = useLoaderData() as Data;

  useEffect(() => {
    const increaseCount = async () => {
      await supabase.rpc('relations_views_count', { reltp: id });
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

export default Relation;
