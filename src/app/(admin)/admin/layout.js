'use client';
import { Box } from '@mui/material';
import React from 'react';
import TopNavigation from './TopNavigation';
import { Toaster } from '@/components/ui/toaster';

function layout({ children }) {
    return (
        <>
            <TopNavigation />
            <Box>
                {children}
                <Toaster />
            </Box>
        </>
    );
}

export default layout;
