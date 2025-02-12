import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, FreeMode } from 'swiper/modules';

const RecipeCarousel = ({ recipeDataState, setOriginClick }) => {
    const handleClickOrigin = ([id, name]) => {
        setOriginClick(id, name);
    };

    return (
        <div className='w-full gap-5 p-5 items-center'>
            <div className='bg-slate-200 py-2 px-5 rounded-lg'>
                <div className='flex justify-center'>
                    <Swiper
                        className='flex items-center w-96 p-2'
                        style={{ width: '70vh' }}
                        freeMode={true}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={3}
                        spaceBetween={2}
                        modules={[FreeMode, Pagination]}
                    >
                        {recipeDataState.originData.map((ingredient, index) => (
                            <SwiperSlide
                                onClick={() =>
                                    handleClickOrigin([
                                        ingredient.id,
                                        ingredient.name.toUpperCase(),
                                    ])
                                }
                                className=''
                                key={index}
                            >
                                <div className='flex flex-col cursor-pointer items-center justify-center hover:scale-105 duration-300 ease-in-out mb-8'>
                                    <Image
                                        width={50}
                                        height={50}
                                        src={
                                            process.env.NEXT_PUBLIC_STORAGE +
                                            ingredient.image_path
                                        }
                                        alt={ingredient.name}
                                        className='w-20 h-20 rounded-full border border-gray-300 shadow-md hover:shadow-lg'
                                    />
                                    <span className='text-[1rem] text-gray-700 mt-2'>
                                        {ingredient.name}
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default RecipeCarousel;
