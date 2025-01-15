import { Slide } from "../slide/Slide.tsx";
import styles from "./SlidesList.module.css";
import { useSlidesDnD } from "../hooks/useSlidesDnD.ts";
import { useAppActions } from "../hooks/useAppActions.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

const SlidesList = () => {
    const editor = useAppSelector((editor) => editor);
    const { setSelectionSlide } = useAppActions();

    const { draggedIndex, handleDragStart, handleDragEnd, handleDragOver } = useSlidesDnD(editor.presentation.slides);

    const onSlideClick = (slideId: string) => {
        setSelectionSlide({
            selectedSlideId: slideId,
        });
    };

    return (
        <div className={styles.slidesList}>
            {editor.presentation.slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slideWrapper} ${draggedIndex === index ? styles.dragging : ""}`}
                    onClick={() => onSlideClick(slide.id)}
                    draggable={true}
                    onDragStart={() => handleDragStart(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                >
                    <Slide slide={slide} scale={SLIDE_PREVIEW_SCALE} className={styles.item} />
                </div>
            ))}
        </div>
    );
};

export { SlidesList };
