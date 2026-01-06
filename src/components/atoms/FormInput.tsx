'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ className = '', error, value, ...props }, ref) => {
        return (
            <input
                ref={ref}
                value={value ?? ''}
                className={`w-full bg-primary-container border border-[#dedede1f] rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green ${error ? 'border-red-500' : ''} ${className}`}
                {...props}
            />
        );
    }
);


FormInput.displayName = 'FormInput';

export default FormInput;
