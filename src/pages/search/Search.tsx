import { Button, Typography } from '@mui/material';
import { Iconify, Page } from '../../components';

function Search() {
  return (
    <Page title='Search'>
      <Typography variant='h3'>Search</Typography>
      <Button variant='contained' startIcon={<Iconify icon='ic:sharp-delete' />}>
        iconify
      </Button>
    </Page>
  );
}

export default Search;
