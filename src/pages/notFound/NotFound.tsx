import { Page } from '../../components';
import { Box, Typography, Link } from '@mui/material';

function NotFound() {
  return (
    <Page title='404'>
      <Box>
        <Typography>NotFound</Typography>
        <Link href='/'>home</Link>
      </Box>
    </Page>
  );
}

export default NotFound;
