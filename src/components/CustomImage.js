export default function CustomImage({ imgSrc, alt, title, pt }) {
    return (
        <div className="custom-image" style={{ paddingTop: pt }}>
            <img src={imgSrc} alt={alt} title={title} />
        </div>
    );
}
