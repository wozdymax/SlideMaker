import { EditorType } from "../EditorType";
import { ActionType } from "./actions";

const setEditor = (newEditor: EditorType) => {
    return {
        type: ActionType.Set_Editor,
        payload: newEditor,
    };
};

export { setEditor };
