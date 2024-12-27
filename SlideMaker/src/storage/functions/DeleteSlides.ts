import { EditorType } from "../EditorType"
import { deleteSlides } from "../SlideColection"

const deleteSlidesEditor = (editor: EditorType): EditorType => {
    const slidesIdSearch = (editor: EditorType): string[] => {
        const selectedSlides = editor.presentation.slides.filter((slide) => slide.id === editor.selectionSlide?.selectedSlideId)
        if (selectedSlides[0] === undefined) {
            return [""];
        }   
        return [selectedSlides[0].id] 
    }

    return {
        ...editor,
        presentation: deleteSlides(editor.presentation, slidesIdSearch(editor))
    }
}



export { deleteSlidesEditor }