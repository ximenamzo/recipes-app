const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Sirve los archivos estáticos desde la carpeta 'public', accesibles bajo el prefijo '/public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/recipesDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Esquema para las recetas en MongoDB
const recipeSchema = new mongoose.Schema({
  title: String,
  category: String,
  ingredients: String,
  instructions: String,
  publicationDate: { type: Date, default: Date.now },
  price: Number,
  image: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Obtener todas las recetas
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar una nueva receta
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una receta existente
const fs = require('fs');

app.put('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Eliminar la imagen antigua si existe y es diferente de la nueva
    if (recipe.image && recipe.image !== req.body.image) {
      const oldImagePath = path.join(__dirname, 'public', recipe.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Eliminar una receta
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Verifica que esta ruta exista y tenga permisos de escritura
    cb(null, path.join(__dirname, 'public', 'img', 'recipes')); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    // Ajusta la respuesta para que refleje la ubicación correcta de las imágenes
    res.json({ path: `/public/img/recipes/${req.file.filename}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
