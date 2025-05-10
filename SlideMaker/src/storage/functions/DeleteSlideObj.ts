import { EditorType } from "../EditorType";
import { deleteSlideObjs } from "../Slide";

const deleteSlideObjEditor = (editor: EditorType): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id == editor.selectionSlide?.selectedSlideId,
    );

    const objsIndexSearch = (editor: EditorType): string[] => {
        const selectedObjs = editor.presentation.slides[activeSlideIndex].content.findIndex(
            (element) => element.id === editor.selectionObj?.selectedObjId,
        );
        if (selectedObjs === -1) {
            return [];
        }
        return [editor.presentation.slides[activeSlideIndex].content[selectedObjs].id];
    };

    const newSlides = [...editor.presentation.slides];
    newSlides[activeSlideIndex] = deleteSlideObjs(newSlides[activeSlideIndex], objsIndexSearch(editor));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
};
export { deleteSlideObjEditor };
