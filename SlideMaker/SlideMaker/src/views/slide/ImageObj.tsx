import {ImageObj} from "../../storage/Slide.ts";
import {CSSProperties} from "react";

type ImageObjectProps = {
    imageObject: ImageObj,
    scale?: number,
}

const ImageObject = ({imageObject, scale = 1}: ImageObjectProps) => {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.position.y * scale}px`,
        left: `${imageObject.position.x * scale}px`,
        width: `${imageObject.size.w * scale}px`,
        height: `${imageObject.size.h * scale}px`,
    }
    return (
        <img style={imageObjectStyles} src={imageObject.url}/>
    )
}

export {
    ImageObject,
}