import { Page } from '@/components';
import { Card, Container, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { RenderTextArray } from '@/components/RenderTextArray';

export type Data = {
  id: string;
  description: string[] | null;
};

function Personality() {
  const { description, id } = useLoaderData() as Data;

  return (
    <Page title={id.toUpperCase()}>
      <Container maxWidth='lg'>
        <Typography variant='h3' sx={{ textTransform: 'uppercase', my: 2 }}>
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
