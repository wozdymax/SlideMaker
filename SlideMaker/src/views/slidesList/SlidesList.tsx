import { SelectionType } from "../../storage/EditorType.ts";
import {SlideType} from "../../storage/Slide.ts";
import {Slide} from '../slide/Slide.tsx'
import {dispatch} from "../../storage/editor.ts";
import styles from './SlidesList.module.css';
import {setSelection} from "../../storage/Selection.ts";

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesListProps = {
    slides: Array<SlideType>,
    selection: SelectionType,
}

const SlidesList = ({slides, selection}: SlidesListProps) => {
    const onSlideClick = (slideId: string) => {
        dispatch(setSelection, {
            selectedSlideId: slideId,
        })
    }

    return (
        <div className={styles.slidesList}>
            {slides.map(slide =>
                <div key={slide.id} onClick={() => onSlideClick(slide.id)}>
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={slide.id == selection.selectedSlideId}
                        className={styles.item}
                        selection={selection!}
                    />
                </div>
            )}
        </div>
    )
}

export {
    SlidesList,
}