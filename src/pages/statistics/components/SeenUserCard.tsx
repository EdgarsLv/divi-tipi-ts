import { Image, LinkToPersonality, LinkToRelations, ReactTimeAgo } from '@/components';
import { useUserImages } from '@/hooks';
import { SeenUser } from '@/types';
import { Grid, Card, Link, Box, Typography, Paper } from '@mui/material';

function SeenUserCard({ user }: { user: SeenUser }) {
  const { avatar } = useUserImages(user?.seen_user);
  return (
    <Grid sx={{ position: 'relative' }} item xs={10} sm={5} md={4}>
      <Card
        sx={{
          ...(!user?.is_seen && { border: '1px solid lime' }),
          transition: 'ease .2s',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Link sx={{ textDecoration: 'none' }} href={`/user/${user?.seen_user_id}`}>
          <Image ratio='1/1' src={avatar} />
        </Link>
        <Box sx={{ py: 0.5, px: 1 }}>
          <Box>
            <Typography mr={1} variant='subtitle1' component='span'>
              {user?.seen_user?.name}
            </Typography>

            <Typography variant='subtitle1' component='span'>
              {user?.seen_user?.age}
            </Typography>
          </Box>

          <Box>
            <LinkToPersonality
              confirmed={user?.seen_user?.confirmed_sociotype}
              personality={user?.seen_user?.sociotype}
            />
            <LinkToRelations personality={user?.seen_user?.sociotype} />
          </Box>
        </Box>
        <Paper sx={{ position: 'absolute', top: 0, m: 0.5 }}>
          <Typography sx={{ px: 1 }} variant='caption'>
            <ReactTimeAgo date={user?.created_at} />
          </Typography>
        </Paper>
      </Card>
    </Grid>
  );
}

export default SeenUserCard;
