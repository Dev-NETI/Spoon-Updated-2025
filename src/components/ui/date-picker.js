import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({ date, setDate }) {
    const [dateState, setDateState] = useState(date);

    useEffect(() => {
        const formattedDate = dateState
            ? format(dateState, 'yyyy-MM-dd')
            : null;
        setDate(formattedDate);
    }, [dateState]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !dateState && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? (
                        format(date, 'yyyy-MM-dd')
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                    mode='single'
                    selected={dateState}
                    onSelect={setDateState}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
