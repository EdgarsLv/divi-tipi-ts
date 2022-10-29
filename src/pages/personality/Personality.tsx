import { Page } from '@/components';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function Personality() {
  const { name } = useParams();
  return (
    <Page title='Personality'>
      <Typography>Personality</Typography>
      <Typography>{name}</Typography>
    </Page>
  );
}
export default Personality;
