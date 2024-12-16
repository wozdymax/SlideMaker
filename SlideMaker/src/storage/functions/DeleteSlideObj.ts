import { EditorType } from "../EditorType"

function deleteSlideObj(editor: EditorType): EditorType {
    const slideId = editor.selection?.selectedSlideId
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id == slideId)
    const newSlides = [...editor.presentation.slides]
    
    newSlides[slideIndex].content.pop()

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        }
    }
}
export {
    deleteSlideObj,
}