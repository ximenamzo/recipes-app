import React, { useState } from 'react';

const AddModal = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    const newRecipe = { title, category, ingredients, instructions, price, image };
    onSave(newRecipe);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Añadir Receta</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ingredientes</label>
            <textarea className="w-full px-4 py-2 border rounded-lg" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Instrucciones</label>
            <textarea className="w-full px-4 py-2 border rounded-lg" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input type="number" className="w-full px-4 py-2 border rounded-lg" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>Cancelar</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
