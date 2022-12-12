import { useAuth } from '@/contexts/AuthContext';
import { updateIQValue } from '@/redux/slices/accountSlice';
import { useAppDispatch } from '@/redux/store';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};
type Props = {
  countdown: Countdown;
  expired: boolean;
  values: number[];
};

function Timer({ countdown, expired, values }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (expired) {
    const endResult = values.reduce((a, b) => a + b, 70);

    dispatch(updateIQValue(endResult, user?.id)).then(() => navigate('/iq-test-result'));
  }
  return (
    <Stack mb={1} direction='row' justifyContent='center'>
      <Typography variant='subtitle1'>{expired ? '00' : countdown.minutes}</Typography>
      <Typography mx={0.5} variant='subtitle1'>
        :
      </Typography>
      <Typography variant='subtitle1'>{expired ? '00' : countdown.seconds}</Typography>
    </Stack>
  );
}

export default Timer;
