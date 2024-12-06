import { EditorType } from "../EditorType"
import { BgColor, changeBackgroundToColor } from "../Slide"

const EditBackroundToColor = (editor: EditorType, color: BgColor): EditorType => {
    const slideId = editor.selection?.selectedSlideId
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id == slideId)


    const newSlides = [...editor.presentation.slides];
    newSlides[slideIndex] = changeBackgroundToColor(newSlides[slideIndex], color);

    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export { EditBackroundToColor }