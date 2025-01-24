import React, { useState } from 'react';
import { Chip } from '@mui/material';
import { RecipeContext } from '@/stores/RecipeContext';
import { useContext } from 'react';

function DrawerFilterListItem({ data, identifier }) {
    const [isSelected, setIsSelected] = useState(false);
    const { setRecipeState } = useContext(RecipeContext);
    let chipStyle = isSelected ? '' : 'outlined';

    const handleClick = () => {
        if (isSelected) {
            setIsSelected(false);
            setRecipeState(prevState => ({
                ...prevState,
                [identifier]: prevState[identifier].filter(
                    id => id !== data.id
                ),
            }));
        } else {
            setIsSelected(true);
            setRecipeState(prevState => ({
                ...prevState,
                [identifier]: [...prevState[identifier], data.id],
            }));
        }
    };

    return (
        <Chip
            key={data.id}
            label={data.name}
            color='primary'
            variant={chipStyle}
            onClick={handleClick}
        />
    );
}

export default DrawerFilterListItem;
