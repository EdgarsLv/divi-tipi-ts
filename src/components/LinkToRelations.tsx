import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import { setRelations, setRelationSign } from '../utils/showRelations';
import { useAppSelector } from '@/redux/store';
import { selectAccountData } from '@/redux/slices/accountSlice';

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
  const account = useAppSelector(selectAccountData);

  const { name, sign } = getLinkName(account.sociotype, personality);

  const linkTo = `/relationships/${name}`;

  return (
    <LinkStyle href={linkTo} underline='always' variant='subtitle2'>
      {sign}
    </LinkStyle>
  );
}
