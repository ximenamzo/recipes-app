import React from 'react';

const DeleteModal = ({ show, onClose, onDelete, recipe }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Eliminar Receta</h2>
          <p className="mb-4">¿Estás seguro de que deseas eliminar la receta {recipe.title}?</p>
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>Cancelar</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => { onDelete(recipe._id); onClose(); }}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
