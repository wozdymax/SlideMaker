import {EditorType, SelectionType} from "./EditorType.ts";

const setSelection = (editor: EditorType, newSelection: SelectionType): EditorType => {
    return {
        ...editor,
        selection: newSelection,
    }
}

export {
    setSelection,
}