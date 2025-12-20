'use client';

import type React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type EditTextVariant = 'default' | 'outline' | 'filled';
type EditTextSize = 'small' | 'medium' | 'large';

type EditTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    text_font_size?: string;
    text_font_family?: string;
    text_font_weight?: string;
    text_line_height?: string;
    text_text_align?: string;
    text_color?: string;
    fill_background_color?: string;
    border_border_radius?: string;
    layout_width?: string;
    padding?: string;
    position?: string;
    variant?: EditTextVariant;
    size?: EditTextSize;
};

const editTextClasses = cva(
    'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                default: 'focus:ring-green-500',
                outline: 'border-2 focus:ring-green-500',
                filled: 'focus:ring-green-500',
            },
            size: {
                small: 'px-3 py-2 text-sm',
                medium: 'px-4 py-3 text-base',
                large: 'px-5 py-4 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'medium',
        },
    }
);

export default function EditText({
    // Required parameters with defaults
    placeholder = "Enter a valid email address",
    text_font_size = "text-lg",
    text_font_family = "Poppins",
    text_font_weight = "font-medium",
    text_line_height = "leading-5xl",
    text_text_align = "center",
    text_color = "text-text-placeholder",
    fill_background_color = "bg-input-background",
    border_border_radius = "rounded-xl",

    // Optional parameters (no defaults)
    layout_width,
    padding,
    position,

    // Standard React props
    variant,
    size,
    disabled = false,
    className,
    value,
    onChange,
    onFocus,
    onBlur,
    type = "text",
    ...props
}: EditTextProps) {
    // Safe validation for optional parameters
    const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
    const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
    const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

    // Build optional Tailwind classes
    const optionalClasses = [
        hasValidWidth ? `w-[${layout_width}]` : '',
        hasValidPadding ? `p-[${padding}]` : '',
        hasValidPosition ? position : '',
    ]?.filter(Boolean)?.join(' ');

    // Build inline styles for required parameters
    const inputStyles = {
        fontSize: text_font_size === "text-lg" ? "15px" : text_font_size,
        fontFamily: text_font_family || 'Poppins',
        fontWeight: text_font_weight === "font-medium" ? "500" : text_font_weight,
        lineHeight: text_line_height === "leading-5xl" ? "24px" : text_line_height,
        textAlign: text_text_align || 'center',
        color: text_color === "text-text-placeholder" ? "#707070" : text_color,
        backgroundColor: fill_background_color === "bg-input-background" ? "#262626" : fill_background_color,
        borderRadius: border_border_radius === "rounded-xl" ? "12px" : border_border_radius,
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inputStyles}
            className={twMerge(
                editTextClasses({ variant, size }),
                optionalClasses,
                className
            )}
            aria-disabled={disabled}
            {...props}
        />
    );
}
