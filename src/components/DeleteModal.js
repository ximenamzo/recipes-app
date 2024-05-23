import React from 'react';

const DeleteModal = ({ show, onClose, onDelete, recipe }) => {
  if (!show) return null;

  const handleDelete = () => {
    onDelete(recipe._id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Eliminar Receta</h2>
        <p>¿Estás seguro de que quieres eliminar la receta "{recipe.title}"?</p>
        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="delete-btn" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
