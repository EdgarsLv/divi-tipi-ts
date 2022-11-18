import { ReactNode, FormEventHandler } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type FieldValues = Record<string, any>;

type FormProps<TFormValues> = {
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  methods: UseFormReturn<TFormValues & FieldValues, any>;
};

export default function FormProvider<TFormValues extends Record<string, unknown>>({
  children,
  onSubmit,
  methods,
}: FormProps<TFormValues>) {
  return (
    <Form {...methods}>
      <form autoComplete='off' onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}
