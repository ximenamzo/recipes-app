import CustomImage from "./CustomImage";

// Función para eliminar etiquetas HTML
const removeHtmlTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function RecipeCard({ recipe, onView }) {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%" />
            <div className="recipe-card-info">
                <p className="recipe-title">{removeHtmlTags(recipe.title)}</p>
                <p className="recipe-desc">{removeHtmlTags(recipe.ingredients)}</p>
                <a className="view-btn" onClick={onView}>VIEW RECIPE</a>
            </div>
        </div>
    );
}
