'use client';

import FormLabel from '../atoms/FormLabel';
import FormInput from '../atoms/FormInput';
import { type InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function FormField({ 
    label, 
    error, 
    required,
    id,
    ...inputProps 
}: FormFieldProps) {
    return (
        <div>
            <FormLabel htmlFor={id} required={required}>
                {label}
            </FormLabel>
            <FormInput 
                id={id}
                required={required}
                error={error}
                {...inputProps} 
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
}
