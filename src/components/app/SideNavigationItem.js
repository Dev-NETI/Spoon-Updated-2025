import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

function SideNavigationItem({ icon, text, active, href, ...props }) {
    return (
        <Link href={href}>
            <ListItem disablePadding sx={{ display: 'block' }} {...props}>
                <ListItemButton
                    sx={[
                        {
                            minHeight: 48,
                            px: 2.5,
                        },
                        open
                            ? {
                                  justifyContent: 'initial',
                              }
                            : {
                                  justifyContent: 'center',
                              },
                    ]}
                >
                    <ListItemIcon
                        sx={[
                            {
                                minWidth: 0,
                                justifyContent: 'center',
                                color: active && 'blue',
                            },
                            open
                                ? {
                                      mr: 3,
                                  }
                                : {
                                      mr: 'auto',
                                  },
                        ]}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={text}
                        sx={[
                            {
                                color: active && 'blue',
                            },
                            open
                                ? {
                                      opacity: 1,
                                  }
                                : {
                                      opacity: 0,
                                  },
                        ]}
                    />
                </ListItemButton>
            </ListItem>
        </Link>
    );
}

export default SideNavigationItem;
