/* eslint-disable react/prop-types */
import { useFormContext, Controller } from 'react-hook-form';
import { Radio, RadioGroup, FormControlLabel, Divider } from '@mui/material';

export default function RHFRadioGroup({ name, options, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div style={{ width: '100%' }}>
          <RadioGroup {...field} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio sx={{ color: !!error && 'red' }} />}
                label={label?.length ? label[index] : option}
              />
            ))}
          </RadioGroup>

          <Divider />
        </div>
      )}
    />
  );
}
