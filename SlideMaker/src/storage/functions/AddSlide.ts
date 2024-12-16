import { EditorType } from "../EditorType"
import { SlideType } from "../Slide"
import { addSlide } from "../SlideColection"

const addSlideEditor = (editor: EditorType, newSlide: SlideType): EditorType => {
    return {
        ...editor,
        presentation: addSlide(editor.presentation, newSlide)
    }
}



export { addSlideEditor }