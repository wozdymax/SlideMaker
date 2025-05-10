import { Position, SlideType } from "../../storage/Slide.ts";
import { useAppActions } from "../hooks/useAppActions.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import { Slide } from "../slide/Slide.tsx";
import styles from "./Workspace.module.css";

const Workspace = () => {
    const editor = useAppSelector((editor) => editor);
    const selectedSlide: SlideType =
        editor.presentation.slides.find((slide) => slide.id == editor.selectionSlide.selectedSlideId) ||
        editor.presentation.slides[0];
    const { updateSlideObjPosition } = useAppActions();

    const handleObjectMove = (slideObjId: string, newPosition: Position) => {
        updateSlideObjPosition(slideObjId, newPosition);
    };

    return (
        <div className={styles.workspace}>
            <Slide slide={selectedSlide} className={""} onObjectMove={handleObjectMove} />
        </div>
    );
};

export { Workspace };
