'use client';

import type React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    text_font_size?: string;
    text_font_family?: string;
    text_font_weight?: string;
    text_line_height?: string;
    text_text_align?: string;
    text_color?: string;
    fill_background_color?: string;
    border_border_radius?: string;
    layout_gap?: string;
    layout_width?: string;
    padding?: string;
    position?: string;
    margin?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
};

const buttonClasses = cva(
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                primary: 'hover:opacity-90 focus:ring-green-500',
                secondary: 'bg-button-secondary-bg text-text-primary hover:bg-primary-accent focus:ring-green-500',
                outline: 'border-2 bg-transparent hover:bg-opacity-10 focus:ring-green-500',
            },
            size: {
                small: 'text-sm px-3 py-1.5',
                medium: 'text-base px-4 py-2',
                large: 'text-lg px-6 py-3',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'medium',
        },
    }
);

export default function Button({
    // Required parameters with defaults
    text = "Get IDRC",
    text_font_size = "text-sm",
    text_font_family = "var(--font-poppins)",
    text_font_weight = "font-medium",
    text_line_height = "leading-xl",
    text_text_align = "center",
    text_color = "#000000",
    fill_background_color = "bg-accent-green",
    border_border_radius = "rounded-sm",

    // Optional parameters (no defaults)
    layout_gap,
    layout_width,
    padding,
    position,
    margin,

    // Standard React props
    variant,
    size,
    disabled = false,
    className,
    children,
    onClick,
    type = "button",
    ...props
}: ButtonProps) {
    // Safe validation for optional parameters
    const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';
    const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
    const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
    const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
    const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

    // Build optional Tailwind classes
    const optionalClasses = [
        hasValidGap ? `gap-[${layout_gap}]` : '',
        hasValidWidth ? `w-[${layout_width}]` : '',
        hasValidPadding ? `p-[${padding}]` : '',
        hasValidMargin ? `m-[${margin}]` : '',
        hasValidPosition ? position : '',
    ]?.filter(Boolean)?.join(' ');

    // Build inline styles for required parameters
    const buttonStyles: React.CSSProperties = {
        fontSize: text_font_size === "text-sm" ? "12px" : text_font_size,
        fontFamily: text_font_family || 'var(--font-poppins)',
        fontWeight: text_font_weight === "font-medium" ? "500" : text_font_weight,
        lineHeight: text_line_height === "leading-xl" ? "19px" : text_line_height,
        textAlign: (text_text_align || 'center') as React.CSSProperties['textAlign'],
        color: text_color || '#000000',
        backgroundColor: fill_background_color === "bg-accent-green" ? "#4ade80" : fill_background_color,
        borderRadius: border_border_radius === "rounded-sm" ? "6px" : border_border_radius,
    };

    // Safe click handler
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={handleClick}
            style={buttonStyles}
            className={twMerge(
                buttonClasses({ variant, size }),
                optionalClasses,
                className
            )}
            aria-disabled={disabled}
            {...props}
        >
            {children || text}
        </button>
    );
}
