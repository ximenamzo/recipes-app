import CustomImage from "./CustomImage"

export default function HeroSection(){
    const images = [
        "/img/gallery/img_1.jpg",
        "/img/gallery/img_2.jpg",
        "/img/gallery/img_3.jpg",
        "/img/gallery/img_4.jpg",
        "/img/gallery/img_5.jpg",
        "/img/gallery/img_6.jpg",
        "/img/gallery/img_7.jpg",
        "/img/gallery/img_8.jpg",
        "/img/gallery/img_9.jpg"
    ]
    return (
        <article className="section hero">
            <section className="col typography">
                <h1 className="title">¿Qué encontarás aquí?</h1>
                <p className="info">En este pequeño blog encontrarás recetas de todo tipo, sobre todo aquellas en las cuales no necesitas de los ingredientes más gourmet para lograr una deliciosa comida!!</p>
                {/* <button className="btn">explore now</button> */}
            </section>
            <section className="col gallery">
                { images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"} />
                )) }
            </section>
        </article>
    )
}