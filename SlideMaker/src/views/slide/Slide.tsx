import {BgType, SlideObjType, SlideType} from "../../storage/Slide.ts";
import {TextObject} from "./TextObj.tsx";
import {ImageObject} from "./ImageObj.tsx";
import styles from './Slide.module.css'
import {CSSProperties} from "react";
import { SelectionType } from "../../storage/EditorType.ts";
import { dispatch } from "../../storage/editor.ts";
import { setSelection } from "../../storage/Selection.ts";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    isSelected: boolean,
    className: string,
    selection: SelectionType,
}

const Slide = ({slide, scale = 1,  className, isSelected, selection}: SlideProps) => {
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
        dispatch(setSelection, {
            selectedObjId: slideObjId,
        })
    }

    return (
        <div style={slideStyles} className={styles.slide + " " + className} >
            {slide.content.map(slideObj => {
                    switch (slideObj.type) {
                        case SlideObjType.image:
                            return  <div key={slideObj.id} onClick={() => onObjClick(slideObj.id)}>
                                        <ImageObject  imageObject={slideObj} scale={scale} isSelected={slideObj.id == selection.selectedObjId}/>
                                    </div>;
                        case SlideObjType.text:
                            return <div key={slideObj.id} onClick={() => onObjClick(slideObj.id)}>
                                        <TextObject textObject={slideObj} scale={scale} isSelected={false} />
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