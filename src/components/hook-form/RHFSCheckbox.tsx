import { useFormContext, Controller, Path } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

type IFormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  label: string;
};

const RHFSCheckbox = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  ...other
}: IFormInputProps<TFormValues>) => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
};

export default RHFSCheckbox;
