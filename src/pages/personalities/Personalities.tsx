import { Page } from '@/components';
import { Typography, Link, Stack } from '@mui/material';

function Personalities() {
  return (
    <Page title='Personalities'>
      <Typography>Personalities</Typography>
      <Stack>
        <Link href='/personalities/balzaks'>balzaks</Link>
        <Link href='/personalities/hamlets'>hamlets</Link>
      </Stack>
    </Page>
  );
}

export default Personalities;
