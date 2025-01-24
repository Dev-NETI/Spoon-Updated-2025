'use client';

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Slide } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MealTypeFormComponent from '@/components/admin/meal-type/MealTypeFormComponent';

function AddMealTypeModal() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    return (
        <React.Fragment>
            <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleOpenAddModal}
            >
                Add New Meal Type
            </Button>
            <Modal
                open={openAddModal}
                onClose={handleCloseAddModal}
                aria-labelledby='add-meal-type-modal'
                aria-describedby='modal-to-add-new-meal-type'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <Slide
                    direction='left'
                    in={openAddModal}
                    mountOnEnter
                    unmountOnExit
                >
                    <Box
                        sx={{
                            width: '400px',
                            height: '100%',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            overflowY: 'auto',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Typography variant='h6' component='h2'>
                                Add New Meal Type
                            </Typography>
                            <Button
                                onClick={handleCloseAddModal}
                                sx={{ minWidth: 'auto', p: 0.5 }}
                            >
                                <CloseIcon />
                            </Button>
                        </Box>
                        <MealTypeFormComponent
                            mode={1}
                            handleClose={handleCloseAddModal}
                            onClose={handleCloseAddModal}
                        />
                    </Box>
                </Slide>
            </Modal>
        </React.Fragment>
    );
}

export default AddMealTypeModal;
