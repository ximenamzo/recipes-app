import React from 'react';

export default function RecipeModal({ recipe, onClose }) {
    if (!recipe) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <img src={recipe.image} alt={recipe.title} className="modal-img" />
                <h1>{recipe.title}</h1>
                <p><strong>Categoría:</strong> {recipe.category}</p>
                <p><strong>Ingredientes:</strong> <span dangerouslySetInnerHTML={{ __html: recipe.ingredients }} /></p>
                <p><strong>Instrucciones:</strong> <span dangerouslySetInnerHTML={{ __html: recipe.instructions }} /></p>
            </div>
        </div>
    );
}
