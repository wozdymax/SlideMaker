import { BgColor, ImageObj, Position, Size, SlideType, TextObj } from "../Slide";
import { EditorType, SelectionObj, SelectionSlide } from "../EditorType";

export enum ActionType {
    Add_Slide = "addSlide",
    Delete_Slide = "deleteSlide",
    Add_Slide_Obj = "addSlideObj",
    Delete_Slide_Obj = "deleteSlideObj",
    Edit_Text = "editText",
    Edit_Background_To_Color = "editBackgroundToColor",
    Edit_Background_To_Image = "editBackgroundToImage",
    Edit_Name = "editName",
    Update_Slide_Obj_Position = "updateSlideObjPosition",
    Update_Slide_Obj_Size = "updateSlideObjSize",
    Update_Slides = "updateSlides",
    Set_Selection_Slide = "setSelectionSlide",
    Set_Selection_Object = "setSelectionObject",
    Set_Editor = "setEditor",
}

type AddSlideAction = {
    type: ActionType.Add_Slide;
};
type DeleteSlideAction = {
    type: ActionType.Delete_Slide;
};
type AddSlideObjAction = {
    type: ActionType.Add_Slide_Obj;
    payload: TextObj | ImageObj;
};
type DeleteSlideObjAction = {
    type: ActionType.Delete_Slide_Obj;
};
type EditTextAction = {
    type: ActionType.Edit_Text;
    payload: { objectId: string; text: string; fontFamily: string; fontSize: number; fontColor: string };
};
type EditBackgroundToColorAction = {
    type: ActionType.Edit_Background_To_Color;
    payload: BgColor;
};
type EditBackgroundToImageAction = {
    type: ActionType.Edit_Background_To_Image;
    payload: string;
};
type EditNameAction = {
    type: ActionType.Edit_Name;
    payload: string;
};
type UpdateSlideObjPosition = {
    type: ActionType.Update_Slide_Obj_Position;
    payload: { slideObjId: string; newPosition: Position };
};
type UpdateSlideObjSize = {
    type: ActionType.Update_Slide_Obj_Size;
    payload: { slideObjId: string; newSize: Size };
};
type UpdateSlides = {
    type: ActionType.Update_Slides;
    payload: Array<SlideType>;
};
export type SetSelectionActionSlide = {
    type: ActionType.Set_Selection_Slide;
    payload: SelectionSlide;
};
export type SetSelectionActionObject = {
    type: ActionType.Set_Selection_Object;
    payload: SelectionObj;
};
type SetEditorAction = {
    type: ActionType.Set_Editor;
    payload: EditorType;
};

export type EditorAction =
    | AddSlideAction
    | DeleteSlideAction
    | AddSlideObjAction
    | DeleteSlideObjAction
    | EditTextAction
    | EditBackgroundToColorAction
    | EditBackgroundToImageAction
    | EditNameAction
    | UpdateSlideObjPosition
    | UpdateSlideObjSize
    | UpdateSlides
    | SetSelectionActionSlide
    | SetSelectionActionObject
    | SetEditorAction;
