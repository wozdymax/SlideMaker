import { EditorType } from "../EditorType"
import { editTextContent, editTextFont, editTextFontsize, SlideObjType } from "../Slide"

const editText = (editor: EditorType, params: {objectId: string, text: string, fontFamily: string, fontSize: number}): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selectionSlide?.selectedSlideId)
    const ObjIndex = editor.presentation.slides[activeSlideIndex].content.findIndex((element) => element.id === params.objectId)
    const newSlides = [...editor.presentation.slides];

    if (newSlides[activeSlideIndex].content[ObjIndex].type === SlideObjType.image) {
        return {...editor}
    }

    newSlides[activeSlideIndex].content[ObjIndex] = editTextContent(newSlides[activeSlideIndex].content[ObjIndex], params.text);
    newSlides[activeSlideIndex].content[ObjIndex] = editTextFont(newSlides[activeSlideIndex].content[ObjIndex], params.fontFamily);
    newSlides[activeSlideIndex].content[ObjIndex] = editTextFontsize(newSlides[activeSlideIndex].content[ObjIndex], params.fontSize);

    return {
        ...editor,
        presentation:{
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export { editText }