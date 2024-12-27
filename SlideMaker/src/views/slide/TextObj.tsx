import { TextEditor } from "../../components/textEditor/TextEditor.tsx";
import {TextObj} from "../../storage/Slide.ts";
import {CSSProperties, useState} from "react";

type TextObjectProps = {
    textObject: TextObj,
    scale?: number,
    isSelected: boolean,
}

const TextObject = ({textObject, scale = 1, isSelected}: TextObjectProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.w * scale}px`,
        height: `${textObject.size.h * scale}px`,
        fontSize: `${textObject.fontsize * scale}px`,
        font: `${textObject.font}`,
        color: `${textObject.fontcolor}`,
        backgroundColor: `${textObject.bgcolor}`,
    }
    if (isSelected) {
        textObjectStyles.border = '2px solid #0b57d0'
    }

    return (
        <>
            <div onContextMenu={handleContextMenu} style={textObjectStyles}>
                    {textObject.textcontent}
            </div>
            {isEditing && (
                <TextEditor
                    initialText={textObject.textcontent!}
                    position={{ x: textObject.position.x, y: textObject.position.y }}
                    onClose={() => setIsEditing(false)}
                    objectId={textObject.id}
                />
        )}
    </>
    )
}

export {
    TextObject,
}