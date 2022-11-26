import { RequireAvatarAlert } from '@/components';
import { selectAccountData } from '@/redux/slices/accountSlice';
import { useAppSelector } from '@/redux/store';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

function RequireAvatar({ children }: { children: ReactNode }) {
  // eslint-disable-next-line camelcase
  const { has_avatar } = useAppSelector(selectAccountData);

  // eslint-disable-next-line camelcase
  if (!has_avatar) {
    return (
      <Container>
        <RequireAvatarAlert />
      </Container>
    );
  }

  return <>{children}</>;
}

export default RequireAvatar;
