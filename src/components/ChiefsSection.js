import ChiefCard from "./ChiefCard"

export default function ChiefsSection(){
    const chiefs = [
        {
            name: "Ximenita Chimi Manzo",
            img: "/img/top-chiefs/img_1.jpg",
            recipesCount: "Todas",
            cuisine: "De todo",
        }
    ]
    return (
        <div className="section chiefs">
            <h1 className="title">Our Top Chiefs</h1>
            <div className="top-chiefs-container">
                { chiefs.map(chief => <ChiefCard key={chief.name} chief={chief} />) }
            </div>
        </div>
    )
}