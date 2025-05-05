/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  type?: string;
  isTextArea?: boolean;
}

export function FormInput({
  label,
  name,
  register,
  error,
  type = 'text',
  isTextArea = false,
  ...props
}: FormInputProps) {
  const InputComponent = isTextArea ? 'textarea' : 'input';

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <InputComponent
        id={name}
        {...register(name)}
        {...props}
        type={type}
        className={`w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${isTextArea ? 'min-h-[120px]' : ''}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
