import { RequireMetaAlert } from '@/components';
import { selectAccountData, selectIsLoading } from '@/redux/slices/accountSlice';
import { useAppSelector } from '@/redux/store';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

function RequireMeta({ children }: { children: ReactNode }) {
  const { name, age, gender } = useAppSelector(selectAccountData);
  const isLoading = useAppSelector(selectIsLoading);

  const require = (!name || !age || !gender) && !isLoading;

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
