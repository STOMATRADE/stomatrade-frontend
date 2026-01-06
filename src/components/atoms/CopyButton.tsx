'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
    className?: string;
}

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-all active:scale-95 group border border-white/5 ${className}`}
            title="Copy to clipboard"
        >
            {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-placeholder group-hover:text-text-primary transition-colors">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
            )}
        </button>
    );
}
