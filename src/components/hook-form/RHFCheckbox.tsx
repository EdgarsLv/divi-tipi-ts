import { useFormContext, Controller, Path } from 'react-hook-form';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

type IFormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  options: string[];
};

const RHFMultiCheckbox = <TFormValues extends Record<string, unknown>>({
  name,
  options,
  ...other
}: IFormInputProps<TFormValues>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: string) =>
          field.value.includes(option)
            ? field.value.filter((value: string) => value !== option)
            : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
};

export default RHFMultiCheckbox;
