/* eslint-disable react/prop-types */
import { useFormContext, Controller } from 'react-hook-form';
import { Radio, RadioGroup, FormHelperText, FormControlLabel, Divider } from '@mui/material';

export default function RHFRadioGroup({ name, options, getOptionLabel, ...other }) {
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
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
          <Divider />
        </div>
      )}
    />
  );
}
