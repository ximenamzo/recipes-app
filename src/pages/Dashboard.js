import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:5000/api/recipes')
            .then(res => res.json())
            .then(data => setRecipes(data))
            .catch(err => console.error('Error fetching recipes:', err));
    }, []);

    const handleFilterChange = (e) => {
        console.log("Filtrando por:", e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset page to 1 on search
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="dashboard-container">
            <h1>Panel de Administración de Recetas</h1>
            <div className="actions">
                <button className="add-recipe">+ Agregar Receta</button>
                <input
                    type="text"
                    placeholder="Buscar por título o ingredientes"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-recipes"
                />
                <select onChange={handleFilterChange} className="filter-recipes">
                    <option value="recent">Más Recientes</option>
                    <option value="oldest">Más Antiguas</option>
                </select>
            </div>

            <table className="recipes-table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Ingredientes</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecipes.map((recipe) => (
                        <tr key={recipe._id}>
                            <td>{recipe.title}</td>
                            <td className="ingredients">{recipe.ingredients}</td>
                            <td>{new Date(recipe.publicationDate).toLocaleDateString()}</td>
                            <td>
                                <button className="icon-button view-btn"><FontAwesomeIcon icon={faEye} /></button>
                                <button className="icon-button edit-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
                                <button className="icon-button delete-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
