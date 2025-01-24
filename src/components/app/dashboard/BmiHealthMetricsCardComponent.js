import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDashboard } from '@/hooks/api/dashboard';
import { Skeleton } from '@mui/material';
import { useAuth } from '@/hooks/auth';

export default function BmiHealthMetricsCardComponent({
    title,
    subheader = '',
    bmiCategory = 1,
}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth({ middleware: 'auth' });
    const { showWith3Parameter: getBmiData } = useDashboard('bmi-data');
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems =
        data && data.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const { data } = await getBmiData(
                    bmiCategory,
                    user?.user_type_id,
                    user.company?.id
                );

                setData(data);
                setLoading(false);
            };
            fetchData();
        }
    }, [user]);

    // user && console.log(user);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            {loading ? (
                <div className='flex flex-col gap-4 p-6'>
                    <Skeleton animation='wave' variant='rounded' height={70} />
                    <Skeleton animation='wave' variant='rounded' height={70} />
                    <Skeleton animation='wave' variant='rounded' height={70} />
                    <Skeleton animation='wave' variant='rounded' height={70} />
                    <Skeleton animation='wave' variant='rounded' height={70} />
                </div>
            ) : (
                <>
                    <CardHeader title={title} subheader={subheader} />
                    <CardContent>
                        {currentItems.length > 0 ? (
                            <>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    {currentItems.map(item => (
                                        <ListItem key={item.id}>
                                            <ListItemText
                                                primary={`${item.user?.firstname} ${item.user?.lastname}`}
                                                secondary={`BMI: ${item.bmi}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                <Stack spacing={2} sx={{ marginTop: 2 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handleChange}
                                        color='primary'
                                    />
                                </Stack>
                            </>
                        ) : (
                            <div className='flex justify-center items-center'>
                                <p className='text-red-700 italic'>
                                    No data yet.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </>
            )}
        </Card>
    );
}
