import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

export default function QouteSection(){
    return (
        <div className="section quote">
            <p className="qoute-text"><FontAwesomeIcon icon={faQuoteLeft} /> Cocinar es un proceso basado en la observación, el cual no puedes realizar si estás completamente enfocado en la receta.</p>
            <p className="qoute-auther">- Alton Brown</p>
        </div>
    )
}