import React from 'react';

const ViewModal = ({ show, onClose, recipe }) => {
  if (!show || !recipe) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ver Receta</h2>
        <div className="form-group">
          <label>Título:</label>
          <p>{recipe.title}</p>
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <p>{recipe.category}</p>
        </div>
        <div className="form-group">
          <label>Ingredientes:</label>
          <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }} />
        </div>
        <div className="form-group">
          <label>Instrucciones:</label>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <p>${recipe.price}</p>
        </div>
        {recipe.image && (
          <div className="form-group">
            <label>Imagen:</label>
            <img src={`http://localhost:3000${recipe.image}`} alt={recipe.title} style={{ width: '100px' }} />
          </div>
        )}
        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
