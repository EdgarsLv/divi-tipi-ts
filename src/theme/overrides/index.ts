import { Theme } from '@mui/material/styles';
import CssBaseline from './CssBaseline';
import Link from './Link';
import Card from './Card';
import Tabs from './Tabs';

export default function ComponentsOverrides(_theme: Theme) {
  return Object.assign(Link(), CssBaseline(), Card(_theme), Tabs(_theme));
}
