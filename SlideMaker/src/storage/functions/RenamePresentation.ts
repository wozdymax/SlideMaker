import { EditorType } from "../EditorType"
import { renamePresentation } from "../Presentation"


const renamePresentationEditor = (editor: EditorType, newName: string): EditorType => {
    return {
        ...editor,
        presentation: renamePresentation(editor.presentation, newName)
    }
}



export { renamePresentationEditor }