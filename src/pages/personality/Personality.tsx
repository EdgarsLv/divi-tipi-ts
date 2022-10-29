import { Page } from '@/components';
import { Card, Container, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

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
          <Stack spacing={3}>
            {description?.map((text, i) => (
              <Typography key={`${id}-${i}`} variant='body2' sx={{ textAlign: 'justify' }}>
                {text}
              </Typography>
            ))}
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
export default Personality;
