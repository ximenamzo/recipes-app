import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddModal = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    const newRecipe = { title, category, ingredients, instructions, price, image: '' };
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const imageResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!imageResponse.ok) {
          throw new Error('Error uploading image');
        }
        const imageData = await imageResponse.json();
        newRecipe.image = imageData.path;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });
      if (response.ok) {
        const savedRecipe = await response.json();
        onSave(savedRecipe);
        onClose();
      } else {
        console.error('Error saving recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Añadir Receta</h2>
        <div className="form-group">
          <label>Título</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Ingredientes</label>
          <ReactQuill value={ingredients} onChange={setIngredients} className="quill" />
        </div>
        <div className="form-group">
          <label>Instrucciones</label>
          <ReactQuill value={instructions} onChange={setInstructions} className="quill" />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="save-btn" onClick={handleSave}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
