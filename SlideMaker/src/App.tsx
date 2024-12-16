import styles from './App.module.css';
import { EditorType } from './storage/EditorType';
import { SlideType } from './storage/Slide';
import { SlidesList } from './views/slidesList/SlidesList';
import { TopPanel } from './views/topPanel/TopPanel';
import { Workspace } from './views/workspace/Workspace';

type AppProps = {
    editor: EditorType;
}

const App = ({editor}: AppProps) => {
    const slideSearch = (editor: EditorType): SlideType => {
        const selectedSlides = editor.presentation.slides.map((slide) => {
            if (slide.id === editor.selection?.selectedSlideId) {
                return slide;
            }
        });
        const selectedSlide = selectedSlides.find(slide => slide !== undefined)
        if (selectedSlide === undefined) {
            return editor.presentation.slides[0];
        }   
        return selectedSlide 
    }

    return (
        <>
            <TopPanel name={editor.presentation.name}/>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection!}/>
                
                <Workspace slide={slideSearch(editor)}/>
            </div>
        </>
    )
}

export default App