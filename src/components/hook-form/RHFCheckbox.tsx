import { useFormContext, Controller, Path } from 'react-hook-form';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useRelationColors } from '@/hooks';

type IFormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  options: string[];
  setColor?: boolean;
};

const RHFMultiCheckbox = <TFormValues extends Record<string, unknown>>({
  name,
  options,
  setColor = false,
  ...other
}: IFormInputProps<TFormValues>) => {
  const color = useRelationColors();
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
                    sx={{ ...(setColor && { color: `${color(option)}` }) }}
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
