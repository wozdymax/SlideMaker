import {defaultEditor} from './data.ts'
import { EditorType } from './EditorType.ts'

let _editor: EditorType = defaultEditor
let _handler: Function | null = null

const getEditor = () => {
    return _editor
}

const setEditor = (newEditor: EditorType) => {
    _editor = newEditor
}

const dispatch = (modifyFn: Function, payload?: Object) => {
    
    const newEditor = modifyFn(_editor, payload)
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
}

const addEditorChangeHandler = (handler: Function)  => {
    _handler = handler
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}