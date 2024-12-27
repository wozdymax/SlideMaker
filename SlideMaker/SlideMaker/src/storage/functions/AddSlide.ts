import { EditorType } from "../EditorType"
import { SlideType } from "../Slide"
import { addSlide } from "../SlideColection"

const addSlideEditor = (editor: EditorType, newSlide: SlideType): EditorType => {
    const slidesIdSearch = (editor: EditorType): string => {
        const selectedSlides = editor.presentation.slides.filter((slide) => slide.id === editor.selectionSlide?.selectedSlideId);
        if (selectedSlides[0] === undefined) {
            return editor.presentation.slides[editor.presentation.slides.length - 1].id;
        }   
        return selectedSlides[0].id;
    }

    return {
        ...editor,
        presentation: addSlide(editor.presentation, newSlide, slidesIdSearch(editor))
    }
}



export { addSlideEditor }