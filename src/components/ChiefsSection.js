import ChiefCard from "./ChiefCard"

export default function ChiefsSection(){
    const chiefs = [
        {
            name: "Ximenita Chimi Manzo",
            img: "/img/top-chiefs/img_1.jpg",
            recipesCount: "Todas",
            cuisine: "De todo",
            instagram: "https://www.instagram.com/xime.mzo/?hl=es-la",
            github: "https://github.com/ximenamzo",
            linkedin: "https://www.linkedin.com/in/ximena-manzo-cast/",
        }
    ]
    return (
        <div className="section chiefs">
            <h1 className="title">La Chef Estrella</h1>
            <div className="top-chiefs-container">
                { chiefs.map(chief => <ChiefCard key={chief.name} chief={chief} />) }
            </div>
        </div>
    )
}