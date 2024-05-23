import React, { useEffect, useState } from 'react';
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/recipes')
            .then(res => res.json())
            .then(data => {
                const updatedData = data.map(recipe => ({
                    ...recipe,
                    image: recipe.image ? `http://localhost:5000${recipe.image}` : '/img/default-image.jpg',
                }));
                setRecipes(updatedData);
            })
            .catch(err => console.error('Error fetching recipes:', err));
    }, []);

    return (
        <div>
            <PreviousSearches />
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} onView={() => setSelectedRecipe(recipe)} />
                ))}
            </div>
            {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
        </div>
    );
}
