import {SlideType} from "../../storage/Slide.ts";
import {Slide} from '../slide/Slide.tsx'
import styles from './SlidesPanel.module.css'

const SLIDE_PREVIEW_SCALE = 0.2

type SlidesPanelPros = {
    slides: Array<SlideType>,
}

const SlidesPanel = ({slides}: SlidesPanelPros) => {
    return (
        <div className={styles.slidesPanel}>
            {slides.map(slide =>
                <div key={slide.id}>
                    <Slide
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={false}
                        className={styles.item}
                    ></Slide>
                </div>
            )}
        </div>
    )
}

export {
    SlidesPanel,
}