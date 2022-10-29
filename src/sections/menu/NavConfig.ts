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
    subheader: 'Main',
    items: [
      { title: 'Meklēt', path: '/', Icon: HomeTwoTone },
      { title: 'Vēstules', path: 'messages', Icon: InboxIcon },
      { title: 'Statistika', path: 'statistics', Icon: Send },

      {
        title: 'Socionika',
        path: '',
        Icon: Menu,
        children: [
          { title: 'Tests', path: '/personalities/test' },
          { title: 'Sociotipi', path: 'personalities' },
          { title: 'Saderības', path: 'relationships' },
        ],
      },
      { title: 'Diskusijas', path: 'discussions', Icon: HomeTwoTone },
    ],
  },

  {
    subheader: 'Secondary',
    items: [
      { title: 'Izklaide', path: '/', Icon: HomeTwoTone },
      { title: 'Atsauksmes', path: 'page2', Icon: SettingsTwoToneIcon },
    ],
  },
];
