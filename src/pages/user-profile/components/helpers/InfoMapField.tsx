import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoxStyle = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  marginLeft: '16px',
  marginBottom: '8px',
  textTransform: 'capitalize',
}));

const checkValid = (attribute?: string[]) => {
  if (!attribute) {
    return false;
  }
  if ((attribute.length === 1 && attribute.includes('')) || attribute.length === 0) {
    return false;
  }

  return true;
};

type Props = {
  attribute?: string[];
  id: string;
};
export default function InfoMapField({ attribute, id }: Props) {
  const isValid = checkValid(attribute);

  return (
    <>
      {isValid && (
        <BoxStyle>
          <Typography sx={{ mr: 2 }} color='text.secondary' component='span'>
            {id}:
          </Typography>
          <Box>
            {attribute?.map((doc, i) => (
              <Typography
                sx={{ display: 'inline-block', mr: 2 }}
                key={i}
                variant='subtitle1'
                component='span'
              >
                {doc}
              </Typography>
            ))}
          </Box>
        </BoxStyle>
      )}
    </>
  );
}
