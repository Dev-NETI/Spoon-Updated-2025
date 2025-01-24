import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog';
import BmiHistoryList from './BmiHistoryList';
import { useAuth } from '@/hooks/auth';
import { useBmiLog } from '@/hooks/api/bmi-log';

function BmiHistoryModal() {
    const { user } = useAuth();
    const { show } = useBmiLog();
    const [bmiLogData, setBmiLogData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const fetchBmiData = async () => {
            const { data } = await show(user.id);
            setBmiLogData(data);
        };
        fetchBmiData();
    }, [user.id, show]);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    return (
        <Dialog>
            <DialogTrigger
                className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold 
                        text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 
                        focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150'
            >
                BMI History
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>BMI History</DialogTitle>
                </DialogHeader>
                <div>
                    <BmiHistoryList
                        bmiLogData={bmiLogData}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                    <div className='flex justify-center mt-4'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='px-4 py-2 mr-2 bg-gray-800 text-white rounded disabled:opacity-50'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={
                                currentPage * itemsPerPage >= bmiLogData.length
                            }
                            className='px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50'
                        >
                            Next
                        </button>
                    </div>
                </div>
                <DialogDescription />
            </DialogContent>
        </Dialog>
    );
}

export default BmiHistoryModal;
