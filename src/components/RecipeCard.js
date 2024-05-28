import CustomImage from "./CustomImage";

// Función para eliminar etiquetas HTML
const removeHtmlTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function RecipeCard({ recipe, onView }) {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} alt={recipe.altText} title={recipe.altText} pt="65%" />
            <div className="recipe-card-info">
                <p className="recipe-title">{removeHtmlTags(recipe.title)}</p>
                <p className="recipe-category">{removeHtmlTags(recipe.category)}</p>
                <p className="recipe-desc">{removeHtmlTags(recipe.ingredients)}</p>
                <a className="view-btn" onClick={onView}>VER RECETA</a>
            </div>
        </div>
    );
}
