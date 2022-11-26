import { RequireSociotypeAlert } from '@/components';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { useAppSelector } from '@/redux/store';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

function RequireSociotype({ children }: { children: ReactNode }) {
  // eslint-disable-next-line camelcase
  const { has_sociotype } = useAppSelector(selectAccountData);

  // eslint-disable-next-line camelcase
  if (!has_sociotype) {
    return (
      <Container>
        <RequireSociotypeAlert />{' '}
      </Container>
    );
  }

  return <>{children}</>;
}

export default RequireSociotype;
