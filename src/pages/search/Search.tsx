import { Box, Button, Container, Grid, Pagination, Stack } from '@mui/material';
import { Page } from '../../components';
import { UserCard } from './components';

function Search() {
  return (
    <Page title='Search'>
      <Container>
        <Stack
          sx={{ my: 2 }}
          direction={{ sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent='flex-end'
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            // width='100%'
            // spacing={1}
            // flexShrink={0}
          >
            <Box />
            <Button size='small' variant='contained'>
              filter
            </Button>
          </Stack>
        </Stack>

        <Grid container columns={20} spacing={3}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2].map((_x, i) => (
            <UserCard id={i} key={i} />
          ))}
        </Grid>
        <Box mt={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            onChange={() => console.log('log')}
            page={1}
            variant='text'
            shape='rounded'
            count={10}
            color='primary'
          />
        </Box>
      </Container>
    </Page>
  );
}

export default Search;
