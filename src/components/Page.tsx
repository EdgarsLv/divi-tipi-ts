import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

interface props {
  children: ReactNode;
  title?: string;
  meta?: ReactNode;
  other?: any;
  sx?: SxProps<Theme>;
}

// eslint-disable-next-line react/display-name
const Page = forwardRef(({ children, title, meta, ...other }: props, ref: any) => (
  <>
    <Helmet>
      <title>{`${title}`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
