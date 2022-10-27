import { ComponentType } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { Menu, Send, HomeTwoTone } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export type Children = {
  title: string;
  path: string;
};
export type Items = {
  title: string;
  path: string;
  Icon: ComponentType<SvgIconProps>;
  children?: Children[];
};
export type Navigation = {
  subheader?: string;
  items: Items[];
};

export const navConfig: Navigation[] = [
  {
    subheader: 'Admin',
    items: [
      { title: 'Page 1', path: '/', Icon: HomeTwoTone },
      { title: 'Page 2', path: 'page2', Icon: InboxIcon },
      { title: 'Page 3', path: 'page3', Icon: Send },

      {
        title: 'Expand 1',
        path: '',
        Icon: Menu,
        children: [
          { title: 'Page 1', path: '/' },
          { title: 'Page 2', path: 'page2' },
          { title: 'Page 3', path: 'page3' },
        ],
      },
      { title: 'Page 1', path: '/', Icon: HomeTwoTone },
    ],
  },

  {
    subheader: 'User',
    items: [
      { title: 'Page 1', path: '/', Icon: HomeTwoTone },
      { title: 'Page 2', path: 'page2', Icon: SettingsTwoToneIcon },
      {
        title: 'expand 2',
        path: '',
        Icon: Menu,
        children: [
          { title: 'Page 1', path: '/' },
          { title: 'Page 2', path: 'page2' },
          { title: 'Page 3', path: 'page3' },
        ],
      },
    ],
  },
];
