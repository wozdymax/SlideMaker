import { EditorType } from "../EditorType"
import { BgColor, changeBackgroundToColor } from "../Slide"

const EditBackroundToColor = (editor: EditorType, color: BgColor): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selectionSlide?.selectedSlideId)

    const newSlides = [...editor.presentation.slides];
    newSlides[activeSlideIndex] = changeBackgroundToColor(newSlides[activeSlideIndex], color);

    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export { EditBackroundToColor }