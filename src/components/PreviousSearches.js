import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRandom } from "@fortawesome/free-solid-svg-icons";

export default function PreviousSearches({ onSearchChange, onSortChange, onRandomRecipe }) {
    const searches = ['pita', 'atún', 'pasta', 'ensalada', '...'];

    return (
        <div className="previous-searches section">
            <h2>Búsquedas populares</h2>
            <div className="previous-searches-container">
                {searches.map((search, index) => (
                    <div key={index} className="search-item">{search}</div>
                ))}
            </div>
            <div className="search-and-filter">
                <div className="search-box">
                    <input type="text" placeholder="Buscar receta..." onChange={(e) => onSearchChange(e.target.value)} />
                    <button className="btn search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="filter-and-random">
                    <select onChange={(e) => onSortChange(e.target.value)} className="sort-recipes">
                        <option value="recent">Más Recientes</option>
                        <option value="oldest">Más Antiguas</option>
                    </select>
                    <button className="btn random-btn" onClick={onRandomRecipe}>
                        <FontAwesomeIcon icon={faRandom} /> Receta Aleatoria
                    </button>
                </div>
            </div>
        </div>
    );
}
