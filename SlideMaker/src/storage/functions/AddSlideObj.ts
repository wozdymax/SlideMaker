import { EditorType } from "../EditorType";
import { addSlideObj, ImageObj, TextObj } from "../Slide";

const addSlideObjEditor = (editor: EditorType, obj: TextObj | ImageObj): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id == editor.selectionSlide?.selectedSlideId,
    );

    const newSlides = [...editor.presentation.slides];
    newSlides[activeSlideIndex] = addSlideObj(newSlides[activeSlideIndex], obj);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
};

export { addSlideObjEditor };
