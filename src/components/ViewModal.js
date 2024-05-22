import React from 'react';

const ViewModal = ({ show, onClose, recipe }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{recipe.title}</h2>
          <p className="mb-4"><strong>Categoría:</strong> {recipe.category}</p>
          <p className="mb-4"><strong>Ingredientes:</strong> {recipe.ingredients}</p>
          <p className="mb-4"><strong>Instrucciones:</strong> {recipe.instructions}</p>
          <p className="mb-4"><strong>Precio:</strong> {recipe.price}</p>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
