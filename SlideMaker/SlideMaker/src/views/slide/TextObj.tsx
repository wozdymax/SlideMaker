import {TextObj} from "../../storage/Slide.ts";
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: TextObj,
    scale?: number,
}
const TextObject = ({textObject, scale = 1}: TextObjectProps) => {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.w * scale}px`,
        height: `${textObject.size.h * scale}px`,
        fontSize: `${textObject.fontsize * scale}px`,
        font: `${textObject.font}`,
        color: `${textObject.fontcolor}`,
        backgroundColor: `${textObject.bgcolor}`
    }
    return (
        <p style={textObjectStyles}>{textObject.textcontent}</p>
    )
}

export {
    TextObject,
}