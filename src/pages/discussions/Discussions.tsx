import { Page } from '@/components';
import { supabase } from '@/service';
import { Discussion } from '@/types';
import { Typography, Stack, Box, Pagination, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { DiscussionBlock, StartDiscussion } from './components';

function Discussions() {
  const [discus, setDiscus] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchDiscussons = async () => {
      try {
        const { data, error, count } = await supabase
          .from('discussions')
          .select('*, author:author_id(name, age, avatar_image->avatar)', {
            count: 'exact',
          })
          .order('updated_at', { ascending: false })
          .range(0, 9);

        console.log(data);
        setDiscus(data);
        if (error) {
          throw error;
        }

        // setDiscus(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDiscussons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title='Diskusijas'>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h3' sx={{ my: 2 }}>
            Diskusijas
          </Typography>

          <StartDiscussion />
        </Stack>
        {discus?.map((x, i) => (
          <DiscussionBlock discussion={x} key={i} />
        ))}

        <Box mt={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            onChange={() => console.log('log')}
            page={1}
            variant='text'
            shape='rounded'
            count={5}
            color='primary'
          />
        </Box>
      </Container>
    </Page>
  );
}
export default Discussions;
