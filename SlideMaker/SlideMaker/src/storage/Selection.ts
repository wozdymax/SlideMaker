import {EditorType, SelectionSlide, SelectionObj} from "./EditorType.ts";

const setSelectionSlide = (editor: EditorType, newSelection: SelectionSlide): EditorType => {
    if (editor.selectionSlide == newSelection){
        return {...editor}
    }
    return {
        ...editor,
        selectionSlide: newSelection,
        selectionObj: {selectedObjId: ""}
    }
}
const setSelectionObj = (editor: EditorType, newSelection: SelectionObj): EditorType => {
    return {
        ...editor,
        selectionObj: newSelection,
    }
}

export {
    setSelectionSlide, setSelectionObj
}