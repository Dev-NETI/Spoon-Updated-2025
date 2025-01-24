import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

function UserListItemComponent({
    name = 'Muhamad',
    createdAt = '190 A.D',
    slug,
}) {
    return (
        <Link href={`/admin/user/${slug}`}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={name} src='' />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component='span'
                                variant='body2'
                                sx={{
                                    color: 'text.primary',
                                    display: 'inline',
                                }}
                            >
                                {createdAt}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider />
        </Link>
    );
}

export default UserListItemComponent;
