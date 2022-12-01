export type Children = {
  title: string;
  path: string;
};
export type Items = {
  title: string;
  path: string;
  icon: string;
  children?: Children[];
};
export type Navigation = {
  subheader?: string;
  items: Items[];
};

export const navConfig: Navigation[] = [
  {
    // subheader: 'Main',
    items: [
      { title: 'Meklēt', path: '/', icon: 'ic:baseline-people-outline' },
      { title: 'Vēstules', path: 'messages', icon: 'fluent:mail-28-regular' },
      { title: 'Statistika', path: 'statistics', icon: 'eva:eye-outline' },
      { title: 'Diskusijas', path: 'discussions', icon: 'bx:bx-chat' },
      {
        title: 'Socionika',
        path: '',
        icon: 'icon-park-outline:weixin-people-nearby',
        children: [
          { title: 'Tests', path: '/personalities/test' },
          { title: 'Sociotipi', path: 'personalities' },
          { title: 'Saderības', path: 'relationships' },
        ],
      },
    ],
  },
];
