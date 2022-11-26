import { Iconify } from '@/components';
import { INTERESTS } from '@/constants';
import { User } from '@/types';
import { Box, Grid, Card, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

function Interests() {
  const user = useLoaderData() as User;

  const userInterests = INTERESTS.filter((x) => user?.interests?.includes(x.name));
  return (
    <Box>
      <Typography variant='h3' sx={{ mb: 1 }}>
        Intereses
      </Typography>

      <Grid container spacing={3}>
        {userInterests?.map((doc, i) => (
          <Grid key={i} item xs={6} md={3}>
            <InterestCard interest={doc} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Interests;

type InterestProps = {
  interest: { icon: string; name: string };
};

function InterestCard({ interest }: InterestProps) {
  const { icon, name } = interest;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Iconify icon={icon} sx={{ color: 'primary.main', width: 40, height: 40 }} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography
          sx={{ textTransform: 'capitalize', color: 'primary.main' }}
          variant='subtitle2'
          noWrap
        >
          {name}
        </Typography>
      </Box>
    </Card>
  );
}
