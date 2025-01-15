import { EditorType } from "../EditorType";
import { SlideType } from "../Slide";

const updateSlides = (editor: EditorType, newSlides: SlideType[]): EditorType => {
    return {
        ...editor,
        presentation: { name: editor.presentation.name, slides: newSlides },
    };
};

export { updateSlides };
