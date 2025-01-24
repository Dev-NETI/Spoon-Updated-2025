'use client';
import React, { useState } from 'react';
import { BloodPressureContext } from '@/stores/BloodPressureContext';
import BloodPressureTrackerForm from '@/components/app/calculator/BloodPressureTrackerForm';
import BloodPressureResultView from '@/components/app/calculator/BloodPressureResultView';

function BloodPressureTracker() {
    const [bloodPressureCategory, setBloodPressureCategory] = useState(null);

    return (
        <BloodPressureContext.Provider
            value={{ bloodPressureCategory, setBloodPressureCategory }}
        >
            <div
                className='gap-2 p-10 md:p-5 lg:p-5  
                       flex flex-col md:flex-row lg:flex-row  '
            >
                <BloodPressureResultView
                    bloodPressureCategory={bloodPressureCategory}
                />
                <BloodPressureTrackerForm />
            </div>
        </BloodPressureContext.Provider>
    );
}

export default BloodPressureTracker;
