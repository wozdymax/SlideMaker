import { SelectionObj, SelectionSlide } from "../../storage/EditorType.ts";
import { SlideType } from "../../storage/Slide.ts";
import { Slide } from '../slide/Slide.tsx'
import { dispatch } from "../../storage/editor.ts";
import styles from './SlidesList.module.css';
import { setSelectionSlide } from "../../storage/Selection.ts";
import { setSlides } from "../../storage/SlideColection.ts";
import { useState } from 'react';

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListProps = {
    slides: Array<SlideType>,
    selectionSlide: SelectionSlide,
    selectionObj: SelectionObj,
}

const SlidesList = ({slides, selectionSlide, selectionObj}: SlidesListProps) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const onSlideClick = (slideId: string) => {
        dispatch(setSelectionSlide, {
            selectedSlideId: slideId,
        });
    }

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    }

    const handleDragEnd = () => {
        setDraggedIndex(null);
    }

    const handleDragOver = (event: React.DragEvent, index: number) => {
        event.preventDefault();
        if (draggedIndex === null) return;
        
        if (draggedIndex !== index) {
            const newSlides = [...slides];
            const [movedSlide] = newSlides.splice(draggedIndex, 1);
            newSlides.splice(index, 0, movedSlide);
            
            dispatch(setSlides, newSlides);
            setDraggedIndex(index);
        }
    }

    return (
        <div className={styles.slidesList}>
            {slides.map((slide, index) => (
                <div 
                    key={slide.id}
                    className={`${styles.slideWrapper} ${draggedIndex === index ? styles.dragging : ''}`}
                    onClick={() => onSlideClick(slide.id)}
                    draggable={true}
                    onDragStart={() => handleDragStart(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                >
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id === selectionSlide.selectedSlideId}
                        className={styles.item}
                        selectionObj={selectionObj}
                    />
                </div>
            ))}
        </div>
    )
}

export {
    SlidesList,
}
