'use client';

import { type LabelHTMLAttributes } from 'react';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export default function FormLabel({ 
    children, 
    className = '', 
    required,
    ...props 
}: FormLabelProps) {
    return (
        <label 
            className={`block text-sm font-medium text-text-secondary mb-1 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
}
