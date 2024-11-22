import styles from './App.module.css';
import { PresentationType } from './storage/Presentation';
import { addSlideObj, createImgSlideObj, createSlide, createTextSlideObj, ImageObj, SlideType, TextObj } from './storage/Slide';
import { addSlide } from './storage/SlideColection';
import { SlidesPanel } from './views/slidesPanel/SlidesPanel';
import { TopPanel } from './views/topPanel/TopPanel';
import { Workspace } from './views/workspace/Workspace';

type AppProps = {
    presentation: PresentationType;
}
function App({presentation}: AppProps) {
    let slide1: SlideType = createSlide();
    const text1: TextObj = createTextSlideObj({x: 90, y: 0}, {w:150, h:90});
    text1.textcontent = "Слайд 1";
    slide1 = addSlideObj(slide1, text1);
    const img1: ImageObj = createImgSlideObj({x:200, y: 140}, {w:150, h:180}, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6G5ZoAKwc2A_8NEaiGWClkMoxVo_0xUf8Q&s");
    slide1 = addSlideObj(slide1, img1);

    let slide2: SlideType = createSlide();
    const text2: TextObj = createTextSlideObj({x: 90, y: 0}, {w:150, h:90});
    text2.textcontent = "Слайд 2";
    slide2 = addSlideObj(slide2, text2);

    presentation = addSlide(presentation, slide1);
    presentation = addSlide(presentation, slide2);



    return (
        <>
            <TopPanel name={presentation.name}></TopPanel>
            <div className={styles.container}>
                <SlidesPanel slides={presentation.slides} ></SlidesPanel>
                <Workspace slide={presentation.slides[0]}></Workspace>
            </div>
        </>
    )
}

export default App