import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditModal = ({ show, onClose, onSave, recipe }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setCategory(recipe.category);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
      setPrice(recipe.price);
      setImage(recipe.image);
      setAltText(recipe.altText);
    }
  }, [recipe]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    console.log('Updating recipe ID:', recipe._id);
    const updatedRecipe = { title, category, ingredients, instructions, price, altText };
  
    if (image && typeof image === 'object') {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const imageResponse = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!imageResponse.ok) {
          throw new Error('Error uploading image');
        }
        const imageData = await imageResponse.json();
        updatedRecipe.image = imageData.path;
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    } else {
      updatedRecipe.image = recipe.image;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${recipe._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });
      if (!response.ok) {
        throw new Error('Error updating recipe');
      }
      const savedRecipe = await response.json();
      onSave(savedRecipe);
      onClose();
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };
  

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Receta</h2>
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
        <div className="form-group">
          <label>Texto alternativo</label>
          <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} />
        </div>
        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="save-btn" onClick={handleSave}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
