'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Box, Chip, Button, Paper, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMealType } from '@/hooks/api/meal-type';
import {
    CheckCircleOutline,
    CancelOutlined,
    Edit as EditIcon,
    BlockOutlined,
} from '@mui/icons-material';
import AddMealTypeModal from './AddMealTypeModal';
import SpoonLoading from '@/app/(app)/SpoonLoading';
import { MealTypeContext } from '@/stores/MealTypeContext';
import UpdateMealTypeModal from './UpdateMealTypeModal';

function MealTypePage() {
    const [mealTypeState, setMealTypeState] = useState({
        mealTypeData: [],
        responseStore: true,
    });
    const [loading, setLoading] = useState(true);
    const {
        store: storeMealType,
        show: showMealType,
        update: updateMealType,
        destroy: destroyMealType,
        patch: patchMealType,
    } = useMealType();
    const { index: getMealTypeData } = useMealType('all-meal-type');
    const [selectedSlug, setSelectedSlug] = useState(null);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const handleOpenUpdateModal = () => setOpenUpdateModal(true);

    useEffect(() => {
        const fetchMealTypeData = async () => {
            setLoading(true);
            try {
                const { data } = await getMealTypeData();
                setMealTypeState(prevState => ({
                    ...prevState,
                    mealTypeData: data,
                    responseStore: false,
                }));
            } catch (error) {
                // console.error('Error fetching meal type data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (mealTypeState.responseStore) {
            fetchMealTypeData();
        }
    }, [mealTypeState.responseStore, getMealTypeData]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
        {
            field: 'is_active',
            headerName: 'Status',
            width: 120,
            renderCell: params => (
                <Chip
                    icon={
                        params.value === 'Yes' ? (
                            <CheckCircleOutline />
                        ) : (
                            <CancelOutlined />
                        )
                    }
                    label={params.value}
                    color={params.value === 'Yes' ? 'success' : 'error'}
                    variant='outlined'
                    size='small'
                />
            ),
        },
        { field: 'modified_by', headerName: 'Modified By', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 180 },
        {
            field: 'action',
            headerName: 'Actions',
            width: 300,
            renderCell: params => (
                <Box>
                    <Button
                        startIcon={<EditIcon />}
                        size='small'
                        sx={{ mr: 1 }}
                        onClick={() => {
                            setSelectedSlug(params.row.slug);
                            handleOpenUpdateModal(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant='outlined'
                        color={
                            params.row.is_active === 'Yes' ? 'error' : 'success'
                        }
                        size='small'
                        startIcon={
                            params.row.is_active === 'Yes' ? (
                                <BlockOutlined />
                            ) : (
                                <CheckCircleOutline />
                            )
                        }
                        onClick={async () => {
                            try {
                                if (params.row.is_active === 'Yes') {
                                    await destroyMealType(params.row.slug);
                                } else {
                                    await patchMealType(
                                        'activate/' + params.row.slug
                                    );
                                }
                                setMealTypeState(prevState => ({
                                    ...prevState,
                                    responseStore: true,
                                }));
                            } catch (error) {
                                // console.error(
                                //     'Error updating recipe status:',
                                //     error
                                // );
                            }
                        }}
                        sx={{
                            px: 2,
                            py: 1,
                            borderColor:
                                params.row.is_active === 'Yes'
                                    ? 'error.main'
                                    : 'success.main',
                            '&:hover': {
                                backgroundColor:
                                    params.row.is_active === 'Yes'
                                        ? 'error.light'
                                        : 'success.light',
                            },
                        }}
                    >
                        {params.row.is_active === 'Yes'
                            ? 'Deactivate'
                            : 'Activate'}
                    </Button>
                </Box>
            ),
        },
    ];

    const rows = mealTypeState.mealTypeData.map((mealType, index) => ({
        id: index + 1,
        name: mealType.name,
        is_active: mealType.is_active === 0 ? 'No' : 'Yes',
        modified_by: mealType.modified_by || 'N/A',
        updated_at: new Date(mealType.updated_at).toLocaleString(),
        slug: mealType.slug,
    }));

    if (loading) {
        return <SpoonLoading />;
    }

    return (
        <MealTypeContext.Provider
            value={{
                storeMealType,
                setMealTypeState,
                showMealType,
                updateMealType,
                destroyMealType,
            }}
        >
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={12} sm={8}>
                            <Typography variant='h4' gutterBottom>
                                Meal Type Management
                            </Typography>
                            <Typography variant='body1'>
                                Here you can manage meal types. Add, edit, or
                                delete meal types as needed.
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={4}
                            sx={{ textAlign: { xs: 'left', sm: 'right' } }}
                        >
                            <AddMealTypeModal />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{ height: 700, width: '100%', overflow: 'hidden' }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 50]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        sx={{
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </Paper>

                <UpdateMealTypeModal
                    open={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    slug={selectedSlug}
                />
            </Box>
        </MealTypeContext.Provider>
    );
}

export default MealTypePage;
