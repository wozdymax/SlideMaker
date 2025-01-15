import { useState } from "react";
import { SlideType } from "../../storage/Slide.ts";
import { useAppActions } from "./useAppActions.ts";

export const useSlidesDnD = (slides: Array<SlideType>) => {
    const { updateSlides } = useAppActions();

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleDragOver = (event: React.DragEvent, index: number) => {
        event.preventDefault();
        if (draggedIndex === null) return;

        if (draggedIndex !== index) {
            const newSlides = [...slides];
            const [movedSlide] = newSlides.splice(draggedIndex, 1);
            newSlides.splice(index, 0, movedSlide);

            updateSlides(newSlides);
            setDraggedIndex(index);
        }
    };

    return {
        draggedIndex,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
    };
};
