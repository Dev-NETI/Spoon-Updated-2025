import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Box,
} from '@mui/material';

function InstructionTab({ Item }) {
    return (
        <Paper elevation={0} className='p-6 bg-gray-50'>
            <Typography
                variant='h5'
                component='h2'
                className='mb-4 font-semibold text-gray-800'
            >
                Instructions
            </Typography>
            <List>
                {Item?.procedure.map(data => (
                    <ListItem key={data.id} className='mb-6 align-items-start'>
                        <ListItemIcon>
                            <Box className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg'>
                                {data.number}
                            </Box>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant='h6'
                                    className='font-semibold mb-2 text-gray-800'
                                >
                                    Step {data.number}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant='body1'
                                    className='text-gray-700 leading-relaxed'
                                >
                                    {data.description}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default InstructionTab;
