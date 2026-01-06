'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', placeholder = 'Search...', value, onChange, onSearch, ...props }, ref) => {
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && onSearch) {
                onSearch((e.target as HTMLInputElement).value);
            }
        };

        return (
            <div className={`relative ${className}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                    ref={ref}
                    type="text"
                    value={value ?? ''}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full bg-primary-container border border-[#dedede1f] rounded-xl pl-10 pr-4 py-2 text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-accent-green"
                    {...props}
                />
            </div>
        );
    }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
