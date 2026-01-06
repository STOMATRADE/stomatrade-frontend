'use client';

import FormLabel from '../atoms/FormLabel';
import FormSelect, { type SelectOption } from '../atoms/FormSelect';
import { type SelectHTMLAttributes } from 'react';

interface FormSelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string;
}

export default function FormSelectField({ 
    label, 
    options,
    placeholder,
    error, 
    required,
    id,
    ...selectProps 
}: FormSelectFieldProps) {
    return (
        <div>
            <FormLabel htmlFor={id} required={required}>
                {label}
            </FormLabel>
            <FormSelect 
                id={id}
                options={options}
                placeholder={placeholder}
                required={required}
                error={error}
                {...selectProps} 
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
}
