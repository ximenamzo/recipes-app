import React, { useEffect, useState } from 'react';
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/api/recipes')
            .then(res => res.json())
            .then(data => {
                const updatedData = data.map(recipe => ({
                    ...recipe,
                    image: recipe.image ? `http://localhost:3000${recipe.image}` : '/img/default-image.jpg',
                }));
                setRecipes(shuffleArray(updatedData));
                setFilteredRecipes(shuffleArray(updatedData));
            })
            .catch(err => console.error('Error fetching recipes:', err));
    }, []);

    const handleSearchChange = (searchValue) => {
        setCurrentPage(1); // Reset to first page on new search
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

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <article>
            <PreviousSearches onSearchChange={handleSearchChange} onSortChange={handleSortChange} onRandomRecipe={handleRandomRecipe} />
            
            <section className="recipes-container">
                {currentRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} onView={() => setSelectedRecipe(recipe)} />
                ))}
                {filteredRecipes.length === 0 && <p className="no-results"><span>No se han encontrado resultados en su búsqueda.</span><br/><br/>Intente con otra palabra clave.</p>}
            </section>

            <section className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        {index + 1}
                    </button>
                ))}
            </section>
            {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
            {recipes.length === 0 && <p className="no-recipes"><span>Actualmente no hay recetas disponibles.</span><br/><br/>Por favor, inténtelo más tarde.</p>}
        </article>
    );
}
