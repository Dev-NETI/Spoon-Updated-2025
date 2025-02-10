import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ totalStars = 5, size = 15 }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        <div className='flex space-x-0.5'>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;

                return (
                    <FaStar
                        key={index}
                        className={`cursor-pointer transition-all duration-150 ${
                            (hover || rating) >= starValue
                                ? 'text-yellow-400'
                                : 'text-gray-400'
                        }`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                        size={size}
                    />
                );
            })}
        </div>
    );
}
