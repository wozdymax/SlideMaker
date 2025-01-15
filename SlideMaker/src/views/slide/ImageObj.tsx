import { ImageObj, Size } from "../../storage/Slide.ts";
import { CSSProperties } from "react";
import styles from "./Obj.module.css";
import { useResizeDnD } from "../hooks/useResizeDnD.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

type ImageObjectProps = {
    imageObject: ImageObj;
    scale?: number;
    maxSize: Size;
    onResize: (slideObjId: string, newSize: { w: number; h: number }) => void;
};

const ImageObject = ({ imageObject, scale = 1, maxSize, onResize }: ImageObjectProps) => {
    const selectionObj = useAppSelector((editor) => editor.selectionObj);
    const isSelected = imageObject.id == selectionObj.selectedObjId;

    const { handleMouseDown } = useResizeDnD(
        imageObject.id,
        imageObject.size,
        imageObject.position,
        maxSize,
        scale,
        onResize,
    );

    const containerStyles: CSSProperties = {
        position: "absolute",
        top: `${imageObject.position.y * scale}px`,
        left: `${imageObject.position.x * scale}px`,
        width: `${imageObject.size.w * scale}px`,
        height: `${imageObject.size.h * scale}px`,
    };

    const imageStyles: CSSProperties = {
        width: "100%",
        height: "100%",
        border: isSelected ? "2px solid #0b57d0" : "none",
    };

    return (
        <div style={containerStyles}>
            <img style={imageStyles} src={imageObject.url} />
            {isSelected && <div className={styles.resizeHandle} onMouseDown={handleMouseDown} />}
        </div>
    );
};

export { ImageObject };
