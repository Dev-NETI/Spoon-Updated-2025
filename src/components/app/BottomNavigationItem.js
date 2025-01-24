import React from 'react';
import Link from 'next/link';

function BottomNavigationItem({
    route,
    active = false,
    label,
    icon,
    ...props
}) {
    let style = active ? 'text-blue-500' : 'text-gray-800';
    return (
        <Link href={route}>
            <button
                type="button"
                className="inline-flex group flex-col items-center justify-center px-3 group text-gray-800 hover:text-blue-600"
                {...props}>
                <svg
                    className={`${style}  w-6 h-6 mb-1  hover:text-blue-600 mt-2`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d={icon} />
                </svg>
                <span className={`${style} text-sm`}>{label}</span>
            </button>
        </Link>
    );
}

export default BottomNavigationItem;
