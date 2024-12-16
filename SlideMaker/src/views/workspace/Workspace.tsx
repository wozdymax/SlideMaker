import {SlideType} from "../../storage/Slide.ts";
import {Slide} from "../slide/Slide.tsx";
import styles from './Workspace.module.css'

type WorkspaceProps = {
    slide: SlideType,
}

const Workspace = ({slide}: WorkspaceProps) => {
    return (
        <div className={styles.workspace}>
            <Slide slide={slide} isSelected={false} className={""}/>
        </div>
    )
}

export {
    Workspace,
}