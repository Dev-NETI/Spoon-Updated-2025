import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

function CardListItem({ title, className, href = '/calculator', icon = '' }) {
    return (
        <Link className={className} href={href}>
            <Card className='shadow-lg p-4 flex flex-col md:flex-row lg:flex-row'>
                <div className='flex justify-center items-center'>{icon}</div>
                <CardHeader className='font-semibold'>{title}</CardHeader>
            </Card>
        </Link>
    );
}

export default CardListItem;
