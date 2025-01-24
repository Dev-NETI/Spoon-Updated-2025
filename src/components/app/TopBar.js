import React from 'react';
import Image from 'next/image';
import logo from '/public/images/spoon_logo.png';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

function TopBar({ isMobileView, isDrawerOpen, handleDrawerOpen }) {
    return (
        <AppBar position='fixed' open={isDrawerOpen}>
            <Toolbar>
                {!isMobileView && (
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={[
                            {
                                marginRight: 5,
                            },
                            isDrawerOpen && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Image
                    className='mt-12 md:mt-0 lg:mt-0'
                    src={logo}
                    alt='Spoon Logo'
                    width={150}
                    height={150}
                    priority
                />
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
