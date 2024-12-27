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
        const selectedSlides = editor.presentation.slides.filter((slide) => slide.id === editor.selectionSlide?.selectedSlideId)
        if (selectedSlides[0] === undefined) {
            return editor.presentation.slides[0];
        }   
        return selectedSlides[0] 
    }

    return (
        <>
            <TopPanel name={editor.presentation.name}/>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selectionSlide={editor.selectionSlide!} selectionObj={editor.selectionObj!}/>
                
                <Workspace slide={slideSearch(editor)} editor={editor}>
                
                </Workspace>
            </div>
        </>
    )
}

export default App