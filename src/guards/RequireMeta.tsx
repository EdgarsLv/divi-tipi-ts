import { RequireMetaAlert } from '@/components';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { useAppSelector } from '@/redux/store';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

function RequireMeta({ children }: { children: ReactNode }) {
  const { name, age, gender } = useAppSelector(selectAccountData);

  const require = !name || !age || !gender;

  if (require) {
    return (
      <Container>
        <RequireMetaAlert />
      </Container>
    );
  }

  return <>{children}</>;
}

export default RequireMeta;
