import {BgType, Position, SlideObjType, SlideType} from "../../storage/Slide.ts";
import {TextObject} from "./TextObj.tsx";
import {ImageObject} from "./ImageObj.tsx";
import styles from './Slide.module.css'
import {CSSProperties, useState} from "react";
import { SelectionObj} from "../../storage/EditorType.ts";
import { dispatch } from "../../storage/editor.ts";
import { setSelectionObj } from "../../storage/Selection.ts";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    selectionObj: SelectionObj,
    onObjectMove?: (slideObjId: string, newPosition: Position) => void
}

const Slide = ({slide, scale = 1, className, isSelected, selectionObj, onObjectMove}: SlideProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [draggedObjPos, setDraggedObjPos] = useState({ x: 0, y: 0 });

    const slideStyles:CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }


    switch (slide.background.type) {
        case BgType.color:
            slideStyles.background = slide.background.color; 
            break;
        case BgType.image:
            slideStyles.backgroundImage = `url(${slide.background.url})`;
            slideStyles.backgroundSize = "cover";
            break;
    }

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }

    const onObjClick = (slideObjId: string) => {
        dispatch(setSelectionObj, {
            selectedObjId: slideObjId,
        })
    }

    const handleDragStart = (e: React.MouseEvent, objId: string) => {
        e.preventDefault();
        const obj = slide.content.find(element => element.id === objId);
        if (!obj) return;

        setIsDragging(true);
        setDragStartPos({ x: e.clientX, y: e.clientY });
        setDraggedObjPos({ x: obj.position.x, y: obj.position.y });
        onObjClick(objId);
    }

    const handleDragMove = (e: React.MouseEvent) => {
        if (!isDragging || !selectionObj.selectedObjId) return;

        const obj = slide.content.find(element => element.id === selectionObj.selectedObjId);

        const deltaX = (e.clientX - dragStartPos.x) / scale;
        const deltaY = (e.clientY - dragStartPos.y) / scale;

        const newX = Math.max(0, Math.min(SLIDE_WIDTH - obj!.size.w, draggedObjPos.x + deltaX));
        const newY = Math.max(0, Math.min(SLIDE_HEIGHT - obj!.size.h, draggedObjPos.y + deltaY));
        const newPosition: Position = {x: newX, y: newY};

        onObjectMove?.(selectionObj.selectedObjId, newPosition);
    }

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    return (
        <div 
            style={slideStyles} 
            className={styles.slide + " " + className} 
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseOut={handleDragEnd}
            >
            {slide.content.map(slideObj => {
                switch (slideObj.type) {
                    case SlideObjType.image:
                        return  <div 
                                key={slideObj.id} 
                                onClick={() => onObjClick(slideObj.id)}
                                onMouseDown={(e) => handleDragStart(e, slideObj.id)}
                                >
                                    <ImageObject  
                                        imageObject={slideObj} 
                                        scale={scale} 
                                        isSelected={slideObj.id == selectionObj.selectedObjId}
                                    />
                                </div>;
                    case SlideObjType.text:
                        return <div 
                                key={slideObj.id} 
                                onClick={() => onObjClick(slideObj.id)}
                                onMouseDown={(e) => handleDragStart(e, slideObj.id)}
                                >
                                    <TextObject 
                                        textObject={slideObj} 
                                        scale={scale} 
                                        isSelected={slideObj.id == selectionObj.selectedObjId} 
                                    />
                                </div>;    
                    }
                })
            }
        </div>
    )
}

export {
    Slide
}