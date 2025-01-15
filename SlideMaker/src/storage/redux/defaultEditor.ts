import { EditorType } from "../EditorType";
import { createSlide } from "../Slide";

const slide = createSlide();
const defaultEditor: EditorType = {
    presentation: {
        name: "NewPresentation",
        slides: [slide],
    },
    selectionSlide: {
        selectedSlideId: slide.id,
    },
    selectionObj: {
        selectedObjId: "",
    },
};

export { defaultEditor };
