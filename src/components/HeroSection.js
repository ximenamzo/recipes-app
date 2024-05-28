import CustomImage from "./CustomImage"

export default function HeroSection(){
    const images = [
        { src: "/img/gallery/img_1.jpg", alt: "Pizza" },
        { src: "/img/gallery/img_2.jpg", alt: "Guisado" },
        { src: "/img/gallery/img_3.jpg", alt: "Comida Coreana" },
        { src: "/img/gallery/img_4.jpg", alt: "Pasta" },
        { src: "/img/gallery/img_5.jpg", alt: "Hamburguesa" },
        { src: "/img/gallery/img_6.jpg", alt: "Paella" },
        { src: "/img/gallery/img_7.jpg", alt: "Alitas" },
        { src: "/img/gallery/img_8.jpg", alt: "Ramen" },
        { src: "/img/gallery/img_9.jpg", alt: "Cortes de carne" }
    ];

    return (
        <article className="section hero">
            <section className="col typography">
                <h1 className="title">¿Qué encontarás aquí?</h1>
                <p className="info">En este pequeño blog encontrarás recetas de todo tipo, sobre todo aquellas en las cuales no necesitas de los ingredientes más gourmet para lograr una deliciosa comida!!</p>
            </section>
            <section className="col gallery">
                { images.map((image, index) => (
                    <CustomImage key={index} imgSrc={image.src} alt={`Imagen de ${image.alt}`} title={image.alt} pt={"90%"} />
                )) }
            </section>
        </article>
    );
}
