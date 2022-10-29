import { Page } from '@/components';
import { Typography, Link, Stack } from '@mui/material';
import { supabase } from '@/service';
import { PERSONALITIES } from '@/assets/personalities/sociotypes';

function Personalities() {
  return (
    <Page title='Personalities'>
      <Typography>Personalities</Typography>
      <Stack>
        {PERSONALITIES.map((x) => {
          return (
            <Link key={x.name} href={`/personalities/${x.name}`}>
              {x.name}
            </Link>
          );
        })}
      </Stack>
    </Page>
  );
}

export default Personalities;

export async function personalityLoader(name?: string) {
  const { data, error } = await supabase
    .from('sociotypes')
    .select('*')
    .eq('id', name)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}
