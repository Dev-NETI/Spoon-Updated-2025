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
import { Avatar, ListItemAvatar, Skeleton } from '@mui/material';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import Rating from '@mui/material/Rating';

function TopTenRecipeCardComponent({ title, subheader = '' }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth({ middleware: 'auth' });
    const { index: getTopTenRecipe } = useDashboard('top-ten-recipe');
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems =
        data && data.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const { data } = await getTopTenRecipe();

                setData(data);
                setLoading(false);
            };
            fetchData();
        }
    }, [user]);

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
                                        <Link
                                            href={`/recipe-view/${
                                                item.recipe?.slug
                                            }`}
                                            key={Math.random()}
                                        >
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={item.recipe?.name}
                                                        src={
                                                            `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
                                                            '/storage/' +
                                                            item.recipe
                                                                ?.image_path
                                                        }
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={`${item.recipe?.name}`}
                                                    secondary={
                                                        <Rating
                                                            name='read-only'
                                                            value={
                                                                item.average_rating
                                                            }
                                                            readOnly
                                                        />
                                                    }
                                                />
                                            </ListItem>
                                        </Link>
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

export default TopTenRecipeCardComponent;
