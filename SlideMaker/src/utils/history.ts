import { Store } from "redux";
import { EditorType } from "../storage/EditorType";

type HistoryType = {
    undo: () => EditorType | undefined;
    redo: () => EditorType | undefined;
};

const getLastItem = (stack: Array<EditorType>): EditorType => {
    return stack[stack.length - 1];
};
const initHistory = (store: Store<EditorType>): HistoryType => {
    const undoStack: Array<EditorType> = [];
    let redoStack: Array<EditorType> = [];
    let previousEditor = store.getState();
    store.subscribe(() => {
        const editor = store.getState();
        if (!undoStack.length || previousEditor.presentation != editor.presentation) {
            if (editor == getLastItem(undoStack)) {
                undoStack.pop();
                redoStack.push(previousEditor);
            } else if (editor == getLastItem(redoStack)) {
                redoStack.pop();
                undoStack.push(previousEditor);
            } else {
                undoStack.push(previousEditor);
                redoStack = [];
            }
        }
        previousEditor = editor;
    });
    const undo = () => {
        return getLastItem(undoStack);
    };
    const redo = () => {
        return getLastItem(redoStack);
    };
    return {
        undo,
        redo,
    };
};
export { type HistoryType, initHistory };
