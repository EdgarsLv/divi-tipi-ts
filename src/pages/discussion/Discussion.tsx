import { Page } from '@/components';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function Discussion() {
  const { name } = useParams();
  return (
    <Page title='Discussion'>
      <Typography>discussion</Typography>
      <Typography>{name}</Typography>
    </Page>
  );
}

export default Discussion;
