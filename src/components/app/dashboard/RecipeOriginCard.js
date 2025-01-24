import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

function RecipeOriginCard({ imagePath, origin, originId }) {
    return (
        <Link href={`/recipe/${originId}`} className='w-3/12 flex-shrink-0'>
            <div className='w-full max-w-xs px-1'>
                <Card>
                    <CardContent className='flex flex-col items-center justify-center'>
                        <Image
                            src={imagePath}
                            alt={`${origin} flag`}
                            width={100}
                            height={100}
                            className='rounded-full  mt-5'
                        />
                        <p className='text-center text-sm font-light mt-2'>
                            {origin}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Link>
    );
}

export default RecipeOriginCard;
