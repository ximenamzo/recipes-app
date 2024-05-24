export default function ImproveSkills(){
    const list = [
        "Aprenderás nuevas recetas",
        "Experimenta con la comida",
        "Realizar presupuestos para tus comidas",
        "Obtener tips de cocina",
        "Mejora tus hábitos alimenticios",
        "Genera tu propio entorno culinario",
    ]

    const exploreRecipes = () => {
        window.location.href = '/recipes';
    };

    return (
        <div className="section improve-skills">
            <div className="col img">
                <img src="/img/gallery/img_10.jpg" alt="" />
            </div>
            <div className="col typography">
                <h1 className="title">Mejora de tu forma de cocinar!</h1>
                { list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                )) }
                <button className="btn" onClick={exploreRecipes}>Explorar recetas</button>
            </div>
        </div>
    )
}