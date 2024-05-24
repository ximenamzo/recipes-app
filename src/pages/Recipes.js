import React, { useEffect, useState } from 'react';
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/api/recipes')
            .then(res => res.json())
            .then(data => {
                const updatedData = data.map(recipe => ({
                    ...recipe,
                    image: recipe.image ? `http://localhost:5000${recipe.image}` : '/img/default-image.jpg',
                }));
                setRecipes(shuffleArray(updatedData)); // Mezclar las recetas antes de establecer el estado
                setFilteredRecipes(shuffleArray(updatedData)); // Inicializa con todas las recetas en orden aleatorio
            })
            .catch(err => console.error('Error fetching recipes:', err));
    }, []);

    const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue);
        filterAndSortRecipes(searchValue, null);
    };

    const handleSortChange = (sortType) => {
        filterAndSortRecipes(searchTerm, sortType);
    };

    const handleRandomRecipe = () => {
        if (recipes.length > 0) {
            const randomIndex = Math.floor(Math.random() * recipes.length);
            setSelectedRecipe(recipes[randomIndex]);
        }
    };

    const filterAndSortRecipes = (searchValue, sortType) => {
        let updatedRecipes = recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            recipe.ingredients.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (sortType === "recent") {
            updatedRecipes.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
        } else if (sortType === "oldest") {
            updatedRecipes.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
        }
        setFilteredRecipes(updatedRecipes);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <div>
            <PreviousSearches onSearchChange={handleSearchChange} onSortChange={handleSortChange} onRandomRecipe={handleRandomRecipe} />
            <div className="recipes-container">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} onView={() => setSelectedRecipe(recipe)} />
                    ))
                ) : (
                    <p className="no-results"><span>No se han encontrado resultados en su búsqueda.</span><br/><br/>Intente con otra palabra clave.</p>
                )}
            </div>
            {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
            {recipes.length === 0 && <p className="no-recipes"><span>Actualmente no hay recetas disponibles.</span><br/><br/>Por favor, inténtelo más tarde.</p>}
        </div>
    );
}
