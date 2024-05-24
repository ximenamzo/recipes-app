import React from 'react';

export default function RecipeModal({ recipe, onClose }) {
    if (!recipe) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <img src={recipe.image} alt={recipe.title} className="modal-img" />
                <h1>{recipe.title}</h1>
                <h3>Categoría:</h3>
                <p>{recipe.category}</p>
                <h3>Ingredientes:</h3>
                <p><span dangerouslySetInnerHTML={{ __html: recipe.ingredients }} /></p>
                <h3>Instrucciones:</h3>
                <p><span dangerouslySetInnerHTML={{ __html: recipe.instructions }} /></p>
            </div>
        </div>
    );
}
