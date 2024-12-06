import { EditorType } from "../EditorType"
import { deleteSlides } from "../SlideColection"

const deleteSlidesEditor = (editor: EditorType): EditorType => {
    const slidesIdSearch = (editor: EditorType): string[] => {
        const selectedSlidesId = editor.presentation.slides.map((slide) => {
            if (slide.id === editor.selection?.selectedSlideId) {
                return slide.id;
            }
        });
        if (selectedSlidesId !== undefined) {
            return selectedSlidesId;
        }   
        return [];
    }

    return {
        ...editor,
        presentation: deleteSlides(editor.presentation, slidesIdSearch(editor))
    }
}



export { deleteSlidesEditor }