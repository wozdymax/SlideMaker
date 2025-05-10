import { SlideType } from "../Slide";
import { ActionType } from "./actions";

const updateSlides = (slides: Array<SlideType>) => {
    return {
        type: ActionType.Update_Slides,
        payload: slides,
    };
};
const renamePresentation = (name: string) => {
    return {
        type: ActionType.Edit_Name,
        payload: name,
    };
};

export { updateSlides, renamePresentation };
