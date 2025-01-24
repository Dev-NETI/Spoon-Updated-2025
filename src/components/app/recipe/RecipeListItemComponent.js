import React from 'react';
import RecipeCardComponent from './RecipeCardComponent';
function RecipeListComponent({ data, index }) {
    return (
        <RecipeCardComponent
            imagePath={data.image_path}
            label={data.name}
            href={`/recipe-view/${data.slug}`}
            delay={200 * index}
        />
    );
}

export default RecipeListComponent;
