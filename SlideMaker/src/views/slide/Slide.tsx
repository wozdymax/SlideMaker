import { BgType, Position, Size, SlideObjType, SlideType } from "../../storage/Slide.ts";
import { TextObject } from "./TextObj.tsx";
import { ImageObject } from "./ImageObj.tsx";
import styles from "./Slide.module.css";
import { CSSProperties } from "react";
import { useObjectDnD } from "../hooks/useObjectDnD.ts";
import { useAppActions } from "../hooks/useAppActions.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;
const maxSize: Size = { w: SLIDE_WIDTH, h: SLIDE_HEIGHT };

type SlideProps = {
    slide: SlideType;
    scale?: number;
    className: string;
    onObjectMove?: (slideObjId: string, newPosition: Position) => void;
};

const Slide = ({ slide, scale = 1, className, onObjectMove }: SlideProps) => {
    const selectionSlide = useAppSelector((editor) => editor.selectionSlide);
    const selectionObj = useAppSelector((editor) => editor.selectionObj);
    const isSelected = slide.id == selectionSlide.selectedSlideId;
    const { setSelectionObject, updateSlideObjSize } = useAppActions();

    const { handleMouseDown, handleMouseMove, handleMouseUp } = useObjectDnD(slide, scale, selectionObj, onObjectMove);

    const slideStyles: CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        border: isSelected ? "2px solid #0b57d0" : "none",
    };

    switch (slide.background.type) {
        case BgType.color:
            slideStyles.background = slide.background.color;
            break;
        case BgType.image:
            slideStyles.backgroundImage = `url(${slide.background.url})`;
            slideStyles.backgroundSize = "cover";
            break;
    }

    const onObjClick = (objectId: string) => {
        setSelectionObject({
            selectedObjId: objectId,
        });
    };

    const handleResize = (slideObjId: string, newSize: Size) => {
        updateSlideObjSize(slideObjId, newSize);
    };

    return (
        <div
            style={slideStyles}
            className={styles.slide + " " + className}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {slide.content.map((slideObj) => {
                switch (slideObj.type) {
                    case SlideObjType.image:
                        return (
                            <div
                                key={slideObj.id}
                                onClick={() => onObjClick(slideObj.id)}
                                onMouseDown={(e) => handleMouseDown(e, slideObj.id)}
                            >
                                <ImageObject
                                    imageObject={slideObj}
                                    scale={scale}
                                    maxSize={maxSize}
                                    onResize={handleResize}
                                />
                            </div>
                        );
                    case SlideObjType.text:
                        return (
                            <div
                                key={slideObj.id}
                                onClick={() => onObjClick(slideObj.id)}
                                onMouseDown={(e) => handleMouseDown(e, slideObj.id)}
                            >
                                <TextObject
                                    textObject={slideObj}
                                    scale={scale}
                                    maxSize={maxSize}
                                    onResize={handleResize}
                                />
                            </div>
                        );
                }
            })}
        </div>
    );
};

export { Slide };
