'use client';
import React, { useState } from 'react';
import Welcome from '@/components/app/account-setup/welcome';
import BodyMetrics from '@/components/app/account-setup/BodyMetrics';
import { AccountSetupContext } from '@/stores/AccountSetupContext';
import { useAuth } from '@/hooks/auth';
import ChooseGoal from '@/components/app/account-setup/ChooseGoal';
import Result from '@/components/app/account-setup/Result';
import { useRouter } from 'next/navigation';
import ViewIndicator from '@/components/app/account-setup/ViewIndicator';

function Page() {
    const router = useRouter();
    const [activeView, setActiveView] = useState(1);
    const { user } = useAuth({ middleware: 'auth' });
    const [formDataState, setFormDataState] = useState({
        calorieIntake: user.calorie_intake,
        age: user.age,
        gender: user.gender_id,
        heightImperial: user.height_imperial,
        heightMetric: user.height_metric,
        weightImperial: user.weight_imperial,
        weightMetric: user.weight_metric,
        activityLevelId: user.activity_level_id,
        activityLevel: user.activity_level?.name,
        activityLevelMultiplier: user.activity_level?.multiplier,
        dateOfBirth: user.date_of_birth,
        updateResponse: null,
    });

    let view;
    switch (activeView) {
        case 1:
            view = <Welcome />;
            break;
        case 2:
            view = <BodyMetrics />;
            break;
        case 3:
            view = <ChooseGoal />;
            break;
        default:
            view = <Result />;
            break;
    }

    const handleNextView = () => {
        if (activeView === 4) {
            router.push('/recipe');
        } else {
            setActiveView(prev => prev + 1);
        }
    };

    return (
        <AccountSetupContext.Provider
            value={{ handleNextView, user, formDataState, setFormDataState }}
        >
            <div className='flex flex-col p-4 md:mx-72 lg:mx-72'>
                <ViewIndicator activeView={activeView} />
                {view}
            </div>
        </AccountSetupContext.Provider>
    );
}

export default Page;
