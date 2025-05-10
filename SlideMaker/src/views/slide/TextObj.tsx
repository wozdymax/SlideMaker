import { TextEditor } from "../../components/textEditor/TextEditor.tsx";
import { Size, TextObj } from "../../storage/Slide.ts";
import { CSSProperties, useState } from "react";
import styles from "./Obj.module.css";
import { useResizeDnD } from "../hooks/useResizeDnD.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

type TextObjectProps = {
    textObject: TextObj;
    scale?: number;
    maxSize: Size;
    onResize: (slideObjId: string, newSize: { w: number; h: number }) => void;
};

const TextObject = ({ textObject, scale = 1, maxSize, onResize }: TextObjectProps) => {
    const selectionObj = useAppSelector((editor) => editor.selectionObj);
    const isSelected = textObject.id == selectionObj.selectedObjId;

    const [isEditing, setIsEditing] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const { handleMouseDown } = useResizeDnD(
        textObject.id,
        textObject.size,
        textObject.position,
        maxSize,
        scale,
        onResize,
    );

    const textObjStyles: CSSProperties = {
        position: "absolute",
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.w * scale}px`,
        height: `${textObject.size.h * scale}px`,
        fontSize: `${textObject.fontsize * scale}px`,
        fontFamily: textObject.font,
        color: textObject.fontcolor,
        border: isSelected ? "2px solid #0b57d0" : "none",
    };

    return (
        <div style={textObjStyles} className={styles.wrapper}>
            <div onContextMenu={handleContextMenu} className={styles.content}>
                {textObject.textcontent}
            </div>
            {isSelected && <div className={styles.resizeHandle} onMouseDown={handleMouseDown} />}
            {isEditing && (
                <TextEditor
                    initialText={textObject.textcontent!}
                    initialFontFamily={textObject.font}
                    initialFontSize={textObject.fontsize}
                    initialFontColor={textObject.fontcolor}
                    onClose={() => setIsEditing(false)}
                    objectId={textObject.id}
                />
            )}
        </div>
    );
};

export { TextObject };
