import React from 'react';
import DrawerFilterListItem from './DrawerFilterListItem';

function DrawerFilterList({ label, data = null, identifier }) {
    return (
        <div>
            <h1 className='font-semibold text-stone-800'>{label}</h1>
            <div className='grid grid-cols-3 gap-2 py-1'>
                {data &&
                    data.map(item => (
                        <DrawerFilterListItem
                            key={item.id}
                            data={item}
                            identifier={identifier}
                        />
                    ))}
            </div>
        </div>
    );
}

export default DrawerFilterList;
