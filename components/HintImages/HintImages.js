import HintImage from './HintImage'

export default function HintImages() {
    const images = ['/1.png', '/2.gif', '/3.png', '/4.png', '/5.png', '/6.png']

    return (
        <div>
            {images.map((image, index) => (
                <HintImage index={index} url={image} key={index} />
            ))}
        </div>
    )
}
