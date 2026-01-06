'use client';

import { type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-accent-green text-black hover:bg-accent-green/80',
    secondary: 'border border-[#dedede10] text-text-primary hover:bg-primary-container',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-primary-container',
};

export default function Button({ 
    children, 
    className = '', 
    variant = 'primary',
    isLoading,
    disabled,
    ...props 
}: ButtonProps) {
    return (
        <button 
            className={`py-3 px-4 rounded-xl font-semibold transition-colors disabled:opacity-50 ${variantStyles[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}
