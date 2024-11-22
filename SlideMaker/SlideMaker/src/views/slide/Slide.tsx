import {BgType, SlideObjType, SlideType} from "../../storage/Slide.ts";
import {TextObject} from "./TextObj.tsx";
import {ImageObject} from "./ImageObj.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
}

const Slide = ({slide, scale = 1, isSelected, className}: SlideProps) => {
    const slideStyles:CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    switch (slide.background.type) {
        case BgType.color:
            slideStyles.background = slide.background.color; 
            break;
        case BgType.image:
            slideStyles.background = slide.background.url;
            break;
    }

    if (isSelected) {
        slideStyles.border = '3px solid #0b57d0'
    }
    
    return (
        <div style={slideStyles} className={styles.slide + " " + className}>
            {
                slide.content.map((slideObj) => {
                    switch (slideObj.type) {
                        case SlideObjType.image:
                            return <ImageObject key={slideObj.id} imageObject={slideObj} scale={scale}></ImageObject>;
                        case SlideObjType.text:
                            return <TextObject key={slideObj.id} textObject={slideObj} scale={scale}></TextObject>;    
                    }
                })
            }
        </div>
    )
}

export {
    Slide
}