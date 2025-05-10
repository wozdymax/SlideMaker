import { ImageObj, Position, Size, TextObj, BgColor } from "../Slide";
import { ActionType } from "./actions";

const addSlide = () => {
    return {
        type: ActionType.Add_Slide,
    };
};
const deleteSlide = () => {
    return {
        type: ActionType.Delete_Slide,
    };
};
const addSlideObj = (obj: TextObj | ImageObj) => {
    return {
        type: ActionType.Add_Slide_Obj,
        payload: obj,
    };
};
const deleteSlideObj = () => {
    return {
        type: ActionType.Delete_Slide_Obj,
    };
};
const editBackgroundToColor = (background: BgColor) => {
    return {
        type: ActionType.Edit_Background_To_Color,
        payload: background,
    };
};
const editBackgroundToImage = (background: string) => {
    return {
        type: ActionType.Edit_Background_To_Image,
        payload: background,
    };
};
const updateSlideObjPosition = (slideObjId: string, newPosition: Position) => {
    return {
        type: ActionType.Update_Slide_Obj_Position,
        payload: { slideObjId, newPosition },
    };
};
const updateSlideObjSize = (slideObjId: string, newSize: Size) => {
    return {
        type: ActionType.Update_Slide_Obj_Size,
        payload: { slideObjId, newSize },
    };
};
const editText = (objectId: string, text: string, fontFamily: string, fontSize: number, fontColor: string) => {
    return {
        type: ActionType.Edit_Text,
        payload: { objectId, text, fontFamily, fontSize, fontColor },
    };
};

export {
    addSlide,
    deleteSlide,
    addSlideObj,
    deleteSlideObj,
    editBackgroundToColor,
    editBackgroundToImage,
    updateSlideObjPosition,
    updateSlideObjSize,
    editText,
};
