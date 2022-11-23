import { Image, ReactTimeAgo } from '@/components';
import { Grid, Card, Box, Typography, Paper } from '@mui/material';
import fake from '../../../assets/images/unknown.png';

function DeletedUserCard({ date, isSeen }: { date: string; isSeen: boolean }) {
  return (
    <Grid sx={{ position: 'relative' }} item xs={10} sm={5} md={4}>
      <Card sx={{ ...(!isSeen && { border: '1px solid lime' }) }}>
        <Image ratio='1/1' src={fake} />

        <Box sx={{ py: 0.5, px: 1 }}>
          <Box>
            <Typography mr={1} variant='subtitle1' component='span'>
              Dzēsts lietotājs
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: 'transparent' }}>Dzēsts</Typography>
          </Box>
        </Box>

        <Paper sx={{ position: 'absolute', top: 0, m: 0.5 }}>
          <Typography sx={{ px: 1 }} variant='caption'>
            <ReactTimeAgo date={date} />
          </Typography>
        </Paper>
      </Card>
    </Grid>
  );
}
export default DeletedUserCard;
