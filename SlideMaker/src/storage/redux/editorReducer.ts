import { addSlideEditor } from "../functions/addSlide";
import { addSlideObjEditor } from "../functions/addSlideObj";
import { editBackgroundToColor, editBackgroundToImage } from "../functions/editBackground";
import { deleteSlideObjEditor } from "../functions/deleteSlideObj";
import { deleteSlidesEditor } from "../functions/deleteSlides";
import { setSelectionObj, setSelectionSlide } from "../Selection";
import { EditorType } from "../EditorType";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "./defaultEditor";
import { editText } from "../functions/editText";
import { renamePresentationEditor } from "../functions/renamePresentation";
import { updateSlideObjPosition } from "../functions/updateSlideObjPosition";
import { updateSlideObjSize } from "../functions/updateSlideObjSize";
import { updateSlides } from "../functions/updateSlides";

const editorReducer = (editor: EditorType = defaultEditor, action: EditorAction): EditorType => {
    switch (action.type) {
        case ActionType.Add_Slide:
            return addSlideEditor(editor);
        case ActionType.Delete_Slide:
            return deleteSlidesEditor(editor);
        case ActionType.Add_Slide_Obj:
            return addSlideObjEditor(editor, action.payload);
        case ActionType.Delete_Slide_Obj:
            return deleteSlideObjEditor(editor);
        case ActionType.Edit_Background_To_Color:
            return editBackgroundToColor(editor, action.payload);
        case ActionType.Edit_Background_To_Image:
            return editBackgroundToImage(editor, action.payload);
        case ActionType.Edit_Name:
            return renamePresentationEditor(editor, action.payload);
        case ActionType.Update_Slide_Obj_Position:
            return updateSlideObjPosition(editor, action.payload);
        case ActionType.Update_Slide_Obj_Size:
            return updateSlideObjSize(editor, action.payload);
        case ActionType.Update_Slides:
            return updateSlides(editor, action.payload);
        case ActionType.Edit_Text:
            return editText(editor, action.payload);
        case ActionType.Set_Selection_Object:
            return setSelectionObj(editor, action.payload);
        case ActionType.Set_Selection_Slide:
            return setSelectionSlide(editor, action.payload);
        case ActionType.Set_Editor:
            return action.payload;
        default:
            return editor;
    }
};

export { editorReducer };
