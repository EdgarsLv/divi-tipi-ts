import { Page } from '@/components';
import { Typography, Stack, Link } from '@mui/material';

function Discussions() {
  return (
    <Page title='Discussions'>
      <Typography>Discussions</Typography>
      <Stack>
        <Link href='/discussions/blog'>blog</Link>
        <Link href='/discussions/something'>something</Link>
      </Stack>
    </Page>
  );
}
export default Discussions;
