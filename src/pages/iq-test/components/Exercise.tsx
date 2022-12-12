import { IQData, Pick } from '@/types';
import { Paper, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLoaderData } from 'react-router-dom';

type ExerciseProps = {
  step: number;
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
  values: number[];
  handleNext: () => void;
};

function Exercise({ step, setValues, values, handleNext }: ExerciseProps) {
  const data = useLoaderData() as IQData[];

  const handleClick = (value: Pick, index: number) => {
    const result = values.map((x, i) => (i === step ? (x = value.value) : x));
    setValues(result);

    data?.[step].picking_img.map((x, i) =>
      i === index ? (x.selected = true) : (x.selected = false),
    );

    handleNext();
  };

  return (
    <Stack direction={{ md: 'row' }}>
      <Paper elevation={1} sx={{ mr: { md: 5 }, mb: { xs: 3 }, maxWidth: '320px', padding: '5px' }}>
        <img src={data?.[step].exercise_img} alt={`test-${step}`} />
      </Paper>

      <Items>
        {data?.[step].picking_img.map((value, index) => (
          <Item
            sx={{ backgroundColor: value.selected ? '#ccfabd' : 'white' }}
            onClick={() => handleClick(value, index)}
            key={`data-${index}`}
            elevation={1}
          >
            <img src={`${value.img}`} alt='test' />
          </Item>
        ))}
      </Items>
    </Stack>
  );
}

export default Exercise;

const size = 100;

const Item = styled(Paper)(() => ({
  padding: '5px',

  '&:hover': {
    backgroundColor: '#acf993',
    cursor: 'pointer',
  },
}));

const Items = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(3, ${size}px)`,
  gridAutoRows: ` ${size}px`,
  gap: '10px',
  transition: 'ease-in-out .3s',
  justifyContent: 'center',
}));
