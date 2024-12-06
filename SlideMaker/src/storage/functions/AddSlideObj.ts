import { EditorType } from "../EditorType"
import { addSlideObj, ImageObj, TextObj } from "../Slide"

const addSlideObjEditor = (editor: EditorType, obj: TextObj | ImageObj): EditorType => {
    
    const slideId = editor.selection?.selectedSlideId;
    const slideIndex = editor.presentation.slides.findIndex(slide => slide.id == slideId);

    const newSlides = [...editor.presentation.slides];
    newSlides[slideIndex] = addSlideObj(newSlides[slideIndex], obj);

    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export { addSlideObjEditor }