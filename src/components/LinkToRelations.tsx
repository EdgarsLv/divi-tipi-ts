import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import { setRelations, setRelationSign } from '../utils/showRelations';

const LinkStyle = styled(Link)(() => ({
  overflow: 'hidden',
  padding: '0 5px',
}));

function getLinkName(sociotype: string, personality: string) {
  const name = setRelations(sociotype + ':' + personality);
  const sign = setRelationSign(name);

  return { name, sign };
}

export default function LinkToRelations({ personality }: { personality: string }) {
  const mySociotype = 'draizers';

  const { name, sign } = getLinkName(mySociotype, personality);

  const linkTo = `/relationships/${name}`;

  return (
    <LinkStyle href={linkTo} underline='always' variant='subtitle2'>
      {sign}
    </LinkStyle>
  );
}
