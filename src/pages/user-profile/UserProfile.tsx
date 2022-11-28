const storageUrl = import.meta.env.VITE_SUPABASE_STORAGE_URL;
const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
import { useState, useEffect } from 'react';
import { Iconify, LightBox, Page } from '@/components';
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
import { Cover, Gallery, General, Interests, Messaging } from './components';
import { supabase } from '@/service';
import { useLoaderData } from 'react-router-dom';
import { User } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectIsOpen, setIsOpen } from '@/redux/slices/usersSlice';
import { useAuth } from '@/contexts/AuthContext';
import { addUserToStatistics } from '@/redux/slices/statisticsSlice';

function UserProfile() {
  const data = useAuth();
  const [currentTab, setCurrentTab] = useState('Anketa');
  const [images, setImages] = useState<string[]>([]);

  const user = useLoaderData() as User;
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  const [photoIndex, setPhotoIndex] = useState(0);

  const getMappedImages = () => {
    let images: string[] = [];
    const avatar: string[] = user?.avatar_image?.avatar ? [user?.avatar_image?.avatar] : [];

    if (user.user_images && user.user_images[0]?.images.length > 0) {
      images = [...avatar, ...user.user_images[0].images];
    } else {
      images = avatar;
    }

    return images.map((img) => `${storageUrl}/${img}`);
  };

  useEffect(() => {
    setImages(getMappedImages());

    if (!ADMIN_ID.includes(data.user!.id)) {
      addUserToStatistics(data.user!.id, user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  const handleOpen = (index: number) => {
    dispatch(setIsOpen(true));
    setPhotoIndex(index);
  };

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
      component: <Gallery handleOpen={handleOpen} images={images} />,
    },
  ];

  return (
    <Page title={user.name}>
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

        <LightBox
          handleClose={handleClose}
          isOpen={isOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          images={images}
        />
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
