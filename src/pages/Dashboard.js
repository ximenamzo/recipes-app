import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddModal from '../components/AddModal.js';
import ViewModal from '../components/ViewModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isAuthenticated'));
    const recipesPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/api/recipes')
            .then(res => res.json())
            .then(data => {
                const sortedRecipes = data.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
                setRecipes(sortedRecipes)
            })
            .catch(err => console.error('Error fetching recipes:', err));
    }, []);

    const handleFilterChange = (e) => {
        const sortType = e.target.value;
        if (sortType === "recent") {
            setRecipes([...recipes].sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)));
        } else if (sortType === "oldest") {
            setRecipes([...recipes].sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate)));
        }
    };

    const removeHtmlTags = (text) => {
        return text.replace(/<\/?[^>]+(>|$)/g, "");
    };    
    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset page to 1 on search
    };

    const handleAddRecipe = (newRecipe) => {
        fetch('http://localhost:3000/api/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecipe),
        })
        .then(res => res.json())
        .then(data => {
          setRecipes([...recipes, data]);
        })
        .catch(err => console.error('Error adding recipe:', err));
      };

      const handleSaveRecipe = (updatedRecipe) => {
        fetch(`http://localhost:3000/api/recipes/${updatedRecipe._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedRecipe),
        })
        .then(res => res.json())
        .then(data => {
          const updatedRecipes = recipes.map(recipe =>
            recipe._id === data._id ? data : recipe
          );
          setRecipes(updatedRecipes);
        })
        .catch(err => console.error('Error updating recipe:', err));
      };

      const handleDeleteRecipe = (id) => {
        fetch(`http://localhost:3000/api/recipes/${id}`, {
          method: 'DELETE',
        })
        .then(() => {
          const updatedRecipes = recipes.filter(recipe => recipe._id !== id);
          setRecipes(updatedRecipes);
        })
        .catch(err => console.error('Error deleting recipe:', err));
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

    const logoutSession = () => {
        localStorage.removeItem('isAuthenticated');
        setIsLogin(false); 
        navigate('/');
    }

    return (
        <div className={`dashboard-container`}>
            <h1>Panel de Administración de Recetas</h1>
            <div className="actions">
                <button className="add-recipe" onClick={() => setAddModalOpen(true)}>+ Agregar Receta</button>
                <input
                    type="text"
                    placeholder="Buscar por título o ingredientes"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-recipes"
                />
                <button className="logout" onClick={() => logoutSession()}>Salir</button>
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
                            <td>{removeHtmlTags(recipe.title)}</td>
                            <td className="ingredients">{removeHtmlTags(recipe.ingredients)}</td>
                            <td>{new Date(recipe.publicationDate).toLocaleDateString()}</td>
                            <td>
                                <button className="icon-button view-btn" onClick={() => { setSelectedRecipe(recipe); setViewModalOpen(true); }}>
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="icon-button edit-btn" onClick={() => { setSelectedRecipe(recipe); setEditModalOpen(true); }}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <button className="icon-button delete-btn" onClick={() => { setSelectedRecipe(recipe); setDeleteModalOpen(true); }}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
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
            <AddModal show={isAddModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddRecipe} />
            <ViewModal show={isViewModalOpen} onClose={() => setViewModalOpen(false)} recipe={selectedRecipe} />
            <EditModal show={isEditModalOpen} onClose={() => setEditModalOpen(false)} onSave={handleSaveRecipe} recipe={selectedRecipe} />
            <DeleteModal show={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleDeleteRecipe} recipe={selectedRecipe} />
        </div>
    );
}

export default Dashboard;
