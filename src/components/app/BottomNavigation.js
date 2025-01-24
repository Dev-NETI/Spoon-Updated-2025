'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useAuth } from '@/hooks/auth';

function Navigation() {
    const [value, setValue] = useState('dashboard');
    const router = useRouter();
    const { user } = useAuth({ middleware: 'auth' });

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 'dashboard':
                router.push('/dashboard');
                break;
            case 'recipe':
                router.push('/recipe');
                break;
            case 'calculator':
                router.push('/calculator');
                break;
            case 'favorite':
                router.push('/favorite-recipe');
                break;
            case 'profile':
                router.push('/profile');
                break;
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                mx: 'auto',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                bgcolor: 'background.paper',
                boxShadow: 1,
                pb: 1,
            }}
        >
            <BottomNavigation
                value={value}
                onChange={handleChange}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    mx: 'auto',
                }}
            >
                {user.user_type_id !== 1 && (
                    <BottomNavigationAction
                        label='Home'
                        value='dashboard'
                        icon={<HomeRoundedIcon />}
                    />
                )}
                <BottomNavigationAction
                    label='Recipe'
                    value='recipe'
                    icon={<LocalDiningRoundedIcon />}
                />
                <BottomNavigationAction
                    label='Calculator'
                    value='calculator'
                    icon={<CalculateRoundedIcon />}
                />
                <BottomNavigationAction
                    label='Favorite'
                    value='favorite'
                    icon={<FavoriteBorderRoundedIcon />}
                />
                <BottomNavigationAction
                    label='Me'
                    value='profile'
                    icon={<AccountCircleRoundedIcon />}
                />
            </BottomNavigation>
        </Box>
    );
}

export default Navigation;
