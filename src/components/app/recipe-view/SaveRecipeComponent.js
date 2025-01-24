import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

function SaveRecipeComponent({ isSaved = null, onClick }) {
    return (
        <div className='flex items-center justify-center'>
            <Tooltip title={isSaved ? 'Unsave Recipe' : 'Save Recipe'}>
                {isSaved ? (
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            ease: 'linear',
                            duration: 0.5,
                        }}
                        onClick={onClick}
                    >
                        <FavoriteIcon color='error' fontSize='large' />
                    </motion.div>
                ) : (
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        animate={{ rotate: 0 }}
                        transition={{
                            ease: 'linear',
                            duration: 0.5,
                        }}
                        onClick={onClick}
                    >
                        <FavoriteBorderIcon
                            color='secondary'
                            fontSize='large'
                        />
                    </motion.div>
                )}
            </Tooltip>
        </div>
    );
}

export default SaveRecipeComponent;
