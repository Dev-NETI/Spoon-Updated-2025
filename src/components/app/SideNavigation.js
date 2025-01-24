import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import SideNavigationItem from './SideNavigationItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useAuth } from '@/hooks/auth';

const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            },
        },
    ],
}));

function SideNavigation({ open, handleDrawerClose }) {
    const theme = useTheme();
    const [activeLink, setActiveLink] = useState();
    const { user } = useAuth({ middleware: 'auth' });

    return (
        <Drawer variant='permanent' open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {user.user_type_id !== 1 && (
                    <SideNavigationItem
                        icon={<HomeRoundedIcon />}
                        text='Dashboard'
                        onClick={() => setActiveLink('Dashboard')}
                        active={activeLink === 'Dashboard'}
                        href='/dashboard'
                    />
                )}
                <SideNavigationItem
                    icon={<LocalDiningRoundedIcon />}
                    text='Recipe'
                    onClick={() => setActiveLink('Recipe')}
                    active={activeLink === 'Recipe'}
                    href='/recipe'
                />
                <SideNavigationItem
                    icon={<CalculateRoundedIcon />}
                    text='Calculator'
                    onClick={() => setActiveLink('Calculator')}
                    active={activeLink === 'Calculator'}
                    href='/calculator'
                />
                <SideNavigationItem
                    icon={<FavoriteBorderRoundedIcon />}
                    text='Favorite'
                    onClick={() => setActiveLink('Favorite')}
                    active={activeLink === 'Favorite'}
                    href='/favorite-recipe'
                />
                <SideNavigationItem
                    icon={<AccountCircleRoundedIcon />}
                    text='Profile'
                    onClick={() => setActiveLink('Profile')}
                    active={activeLink === 'Profile'}
                    href='/profile'
                />
            </List>
        </Drawer>
    );
}

export default SideNavigation;
