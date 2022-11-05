import { useState } from 'react';
import { Iconify, Page } from '@/components';
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
import { Cover, Gallery, General, Interests, Messaging } from './components';
import { supabase } from '@/service';

function UserProfile() {
  const [currentTab, setCurrentTab] = useState('Anketa');

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: 'Saziņa',
      icon: <Iconify icon={'icon-park-outline:people-speak'} sx={{ width: '20px' }} />,
      component: <Messaging />,
    },
    {
      value: 'Anketa',
      icon: <Iconify icon={'icon-park-outline:peoples'} sx={{ width: '20px' }} />,
      component: <General />,
    },
    {
      value: 'Intereses',
      icon: <Iconify icon={'ic:outline-interests'} sx={{ width: '20px' }} />,
      component: <Interests />,
    },
    {
      value: 'Galerija',
      icon: <Iconify icon={'carbon:image-copy'} sx={{ width: '20px' }} />,
      component: <Gallery />,
    },
  ];

  return (
    <Page title='Profile'>
      <Container>
        <Card sx={{ my: 2, height: 230, position: 'relative' }}>
          <Cover />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons='auto'
              variant='scrollable'
              allowScrollButtonsMobile
              onChange={(_e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.value}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

export default UserProfile;

export async function profileLoader(id?: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*, user_images(images)')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
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
