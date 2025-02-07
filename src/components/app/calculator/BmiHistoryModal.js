'use client';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useAuth } from '@/hooks/auth';
import { useBmiLog } from '@/hooks/api/bmi-log';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

function BmiHistoryModal() {
    const { user } = useAuth();
    const { show } = useBmiLog();
    const [bmiLogData, setBmiLogData] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const fetchBmiData = async () => {
            const { data } = await show(user.id);
            const modifiedData = data.map(item => ({
                ...item,
                uv: item.bmi,
                created_date: formatDate(item.created_at),
            }));
            setBmiLogData(modifiedData);
        };
        if (!bmiLogData.length > 0) {
            fetchBmiData();
        }
    }, [user.id, show, bmiLogData]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    return (
        <>
            <Button
                variant='contained'
                onClick={() => setOpen(true)}
                sx={{ backgroundColor: '#1F2937' }}
            >
                Bmi History
            </Button>
            <Dialog
                maxWidth='xl'
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
            >
                <DialogTitle>BMI History</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <LineChart width={1200} height={500} data={bmiLogData}>
                            <Line
                                type='monotone'
                                dataKey='uv'
                                stroke='#8884d8'
                            />
                            <CartesianGrid stroke='#ccc' />
                            <XAxis dataKey='created_date' />
                            <YAxis dataKey='bmi' />
                            <Tooltip />
                        </LineChart>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{ backgroundColor: '#1F2937', color: 'white' }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default BmiHistoryModal;
