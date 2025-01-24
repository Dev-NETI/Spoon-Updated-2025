import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeartAnimation = ({ bloodPressureLevel }) => {
    const [animationSettings, setAnimationSettings] = useState({
        duration: 0,
        color: 'grey',
    });

    useEffect(() => {
        switch (bloodPressureLevel) {
            case 'Normal':
                setAnimationSettings({ duration: 1, color: 'green' });
                break;
            case 'Elevated':
                setAnimationSettings({ duration: 0.6, color: 'yellow' });
                break;
            case 'Hypertension Stage 1':
                setAnimationSettings({ duration: 0.4, color: 'orange' });
                break;
            case 'Hypertension Stage 2':
                setAnimationSettings({ duration: 0.3, color: 'darkred' });
                break;
            case 'Hypertensive Crisis':
                setAnimationSettings({ duration: 0.2, color: 'red' });
                break;
            default:
                setAnimationSettings({ duration: 0, color: 'grey' });
        }
    }, [bloodPressureLevel]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh',
            }}
        >
            <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='100'
                height='100'
                initial={{ scale: 1 }}
                animate={{
                    scale: animationSettings.duration ? [1, 1.2, 1] : 1,
                }}
                transition={{
                    duration: animationSettings.duration,
                    repeat: Infinity,
                }}
            >
                <path
                    fill={animationSettings.color}
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                />
            </motion.svg>
        </div>
    );
};

export default HeartAnimation;
