import { useLocation, matchPath } from 'react-router-dom';

export default function useGetActiveLink(path: string): boolean {
  const { pathname } = useLocation();

  return path ? !!matchPath({ path, end: true }, pathname) : false;
}
