"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                className: 'font-sans text-sm font-medium',
                duration: 4000,
                style: {
                    background: '#FFFFFF',
                    color: '#0F172A',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                },
                success: {
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#FFFFFF',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#FFFFFF',
                    },
                },
            }}
        />
    );
}
