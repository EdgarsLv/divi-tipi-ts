import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Tab, Box, Tabs, Card } from '@mui/material';
import { Iconify, Page } from '@/components';
import { Cover, Gallery, General, Interests, Preferences } from './components';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch } from '@/redux/store';
import { fetchAccountImages } from '@/redux/slices/accountSlice';

export default function Account() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [currentTab, setCurrentTab] = useState('Anketa');

  useEffect(() => {
    dispatch(fetchAccountImages(user?.id));
  }, [dispatch, user?.id]);

  const ACCOUNT_TABS = [
    {
      value: 'Anketa',
      icon: <Iconify icon={'la:user-edit'} sx={{ width: '20px' }} />,
      component: <General />,
    },
    {
      value: 'Meklēju',
      icon: <Iconify icon={'la:user-plus'} sx={{ width: '20px' }} />,
      component: <Preferences />,
    },
    {
      value: 'Foto',
      icon: <Iconify icon={'uil:image-plus'} sx={{ width: '20px' }} />,
      component: <Gallery />,
    },
    {
      value: 'Intereses',
      icon: <Iconify icon={'ic:outline-interests'} sx={{ width: '20px' }} />,
      component: <Interests />,
    },
  ];

  return (
    <Page title='Anketa'>
      <Container maxWidth={'lg'}>
        <Card sx={{ my: 2, height: 220, position: 'relative' }}>
          <Cover />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons='auto'
              variant='scrollable'
              allowScrollButtonsMobile
              onChange={(_e, value) => setCurrentTab(value)}
            >
              {ACCOUNT_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={tab.value}
                  icon={tab.icon}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));
