import React from 'react';
import Link from 'next/link';
function RegisterLink() {
    return (
        <Link
            href="/login"
            className="underline text-sm text-gray-600 hover:text-gray-900">
            Already registered?
        </Link>
    );
}

export default RegisterLink;
