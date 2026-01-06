'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../atoms/Button';

interface CrudModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    /** Mobile breakpoint in px, default 768 */
    mobileBreakpoint?: number;
}

export default function CrudModal({ 
    isOpen, 
    onClose, 
    title, 
    children,
    mobileBreakpoint = 768
}: CrudModalProps) {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    useEffect(() => {
        if (isOpen && !isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, isMobile]);

    if (!isOpen) return null;

    // Mobile: Full Page View
    if (isMobile) {
        return (
            <div className="fixed inset-0 z-50 bg-primary-base min-h-screen overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center gap-4 p-4 bg-primary-base border-b border-[#dedede10]">
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </Button>
                    <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        );
    }

    // Desktop: Modal View
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-primary-elevated rounded-3xl border border-[#dedede10] animate-in zoom-in-95 duration-200">
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-primary-elevated border-b border-[#dedede10]">
                    <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </Button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
