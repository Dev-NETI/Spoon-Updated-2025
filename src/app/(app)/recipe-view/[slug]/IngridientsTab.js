import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Paper,
    Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function IngridientsTab({ Item }) {
    return (
        <Paper elevation={0} className='p-6 bg-gray-50'>
            <Typography
                variant='h5'
                component='h2'
                className='mb-4 font-semibold text-gray-800'
            >
                Ingredients
            </Typography>
            <List>
                {(Item?.ingredient || []).map((data, index) => (
                    <React.Fragment key={data.id}>
                        <ListItem className='py-3 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out'>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon className='text-green-600' />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant='body1'
                                        className='font-medium text-gray-700'
                                    >
                                        {data.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant='body2'
                                        className='text-gray-600 mt-1'
                                    >
                                        {data.instruction}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < Item.ingredient.length - 1 && (
                            <Divider
                                variant='fullWidth'
                                component='li'
                                className='my-2'
                            />
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}

export default IngridientsTab;
