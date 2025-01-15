import { SelectionObj, SelectionSlide } from "../EditorType";
import { ActionType } from "./actions";

const setSelectionSlide = (newSelectionSlide: SelectionSlide) => {
    return {
        type: ActionType.Set_Selection_Slide,
        payload: newSelectionSlide,
    };
};
const setSelectionObject = (newSelectionObject: SelectionObj) => {
    return {
        type: ActionType.Set_Selection_Object,
        payload: newSelectionObject,
    };
};

export { setSelectionObject, setSelectionSlide };
