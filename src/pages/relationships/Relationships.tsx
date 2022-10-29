import { Page } from '@/components';
import { Typography, Stack, Link } from '@mui/material';

function Relationships() {
  return (
    <Page title='Relationships'>
      <Typography>Relationships</Typography>
      <Stack>
        <Link href='/relationships/darba'>darba</Link>
        <Link href='/relationships/duālās'>duālās</Link>
      </Stack>
    </Page>
  );
}

export default Relationships;
