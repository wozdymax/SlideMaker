import { dispatch } from "../../storage/editor.ts";
import { EditorType } from "../../storage/EditorType.ts";
import {Position, SlideType, updateSlideObjPosition} from "../../storage/Slide.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'

type WorkspaceProps = {
    slide: SlideType,
    editor: EditorType,
}

const Workspace = ({slide, editor}: WorkspaceProps) => {
    const handleObjectMove = (slideObjId: string, newPosition: Position) => {
        dispatch(updateSlideObjPosition, {slideObjId, newPosition});
    }

    return (
        <div className={styles.workspace}>
            <Slide slide={slide} isSelected={false} className={""} selectionObj={editor.selectionObj!} onObjectMove={handleObjectMove}/>
        </div>
    )
}

export {
    Workspace,
}


