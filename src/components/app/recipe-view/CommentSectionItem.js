import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { formatDate } from 'date-fns';
import { Rating } from '@mui/material';

function CommentSectionItem({ user, dateCreated, review, rating }) {
    return (
        <Card>
            <CardHeader
                title={user}
                subheader={formatDate(dateCreated, 'yyyy-mm-dd hh:mm:ss')}
                sx={{
                    '& .MuiCardHeader-title': {
                        fontSize: '1rem',
                    },
                    '& .MuiCardHeader-subheader': {
                        fontSize: '0.725rem',
                    },
                }}
            />
            <CardContent>
                <Rating name='read-only' value={rating} readOnly />
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {review}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CommentSectionItem;
