import { Page } from '@/components';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function Relation() {
  const { name } = useParams();
  return (
    <Page title='Relation'>
      <Typography>Relation</Typography>
      <Typography>{name}</Typography>
    </Page>
  );
}

export default Relation;
