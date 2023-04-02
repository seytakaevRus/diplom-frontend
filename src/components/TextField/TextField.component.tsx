import React, { memo } from 'react';
import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { TextField as NativeTextField } from '@mui/material';

interface TextFieldProps {
  name: string;
  control: Control<any, any>;
  isError: boolean;
  errorMessage: string | undefined;
  rules: UseControllerProps['rules'];
  label?: string;
  type?: string;
  multiline?: boolean;
}

export const TextField = ({
  control,
  isError,
  errorMessage,
  label,
  rules,
  type,
  name,
  multiline,
}: TextFieldProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <NativeTextField
        {...field}
        fullWidth
        type={type}
        label={label}
        margin="normal"
        error={isError}
        helperText={errorMessage}
        multiline={multiline}
      />
    )}
  />
);
