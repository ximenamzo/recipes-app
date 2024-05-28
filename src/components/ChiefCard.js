import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"


export default function ChiefCard({chief}) {
    return (
        <div className="chief-card">
            <img src={chief.img} alt={chief.imgAlt} title={chief.title} />
            <div className="chief-card-info">
                <h3 className="chief-card-name">{chief.name}</h3>
                <p className="chief-recipe-count">Recipes: <b>{chief.recipesCount}</b></p>
                <p className="chief-cuisine">Cuisine: <b>{chief.cuisine}</b></p>
                <p className="cheif-icons">
                    <a href={chief.instagram}><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href={chief.github}><FontAwesomeIcon icon={faGithub} /></a>
                    <a href={chief.linkedin}><FontAwesomeIcon icon={faLinkedin} /></a>
                </p>
            </div>
        </div>
    )
}