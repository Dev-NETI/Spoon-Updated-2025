import React from 'react';
import { motion } from 'framer-motion';

const BmiGauge = ({ value }) => {
    let needleX = 10,
        needleY = 10;
    if (value < 18.5) {
        needleX = 40;
        needleY = 190;
    } else if (value >= 18.5 && value <= 24.9) {
        needleX = 180;
        needleY = 185;
    } else if (value >= 25 && value <= 29.9) {
        needleX = 180;
        needleY = 33;
    } else {
        needleX = 40;
        needleY = 30;
    }

    return (
        <svg width='220' height='220' viewBox='0 0 220 220'>
            {/* Sections */}
            <path
                d='M 110,20 A 90,90 0 0,1 200,110'
                fill='none'
                stroke='yellow'
                strokeWidth='30'
            />
            <path
                d='M 200,110 A 90,90 0 0,1 110,200'
                fill='none'
                stroke='green'
                strokeWidth='30'
            />
            <path
                d='M 110,200 A 90,90 0 0,1 20,110'
                fill='none'
                stroke='orange'
                strokeWidth='30'
            />
            <path
                d='M 20,110 A 90,90 0 0,1 110,20'
                fill='none'
                stroke='red'
                strokeWidth='30'
            />

            {/* Needle */}
            <motion.line
                x1='110'
                y1='110'
                x2={110}
                y2={110}
                animate={{ x2: needleX, y2: needleY }}
                stroke='black'
                strokeWidth='3'
                transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <circle cx='110' cy='110' r='4' fill='black' />

            {/* Labels */}
            <text x='50' y='162' fontSize='14' textAnchor='middle' fill='black'>
                Underweight
            </text>
            <text
                x='170'
                y='162'
                fontSize='14'
                textAnchor='middle'
                fill='black'
            >
                Healthy Weight
            </text>
            <text x='172' y='52' fontSize='14' textAnchor='middle' fill='black'>
                Overweight
            </text>
            <text x='48' y='52' fontSize='14' textAnchor='middle' fill='black'>
                Obese
            </text>
        </svg>
    );
};

export default BmiGauge;
