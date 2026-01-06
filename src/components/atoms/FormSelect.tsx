'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    placeholder?: string;
    error?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ className = '', options, placeholder, error, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={`w-full bg-primary-container border border-[#dedede1f] rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
