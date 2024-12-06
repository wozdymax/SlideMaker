import {createPresentation, PresentationType} from "./Presentation.ts";
import {EditorType} from "./EditorType.ts";
import { addSlideObj, BgType, changeBackgroundToColor, changeBackgroundToImage, createImgSlideObj, createSlide, createTextSlideObj, ImageObj, SlideType, TextObj } from "./Slide.ts";
import { addSlide } from "./SlideColection.ts";

let presentation: PresentationType = createPresentation();

let slide1: SlideType = createSlide();
const text1: TextObj = createTextSlideObj({x: 90, y: 0}, {w:150, h:90});
text1.textcontent = "Слайд 1";
slide1 = addSlideObj(slide1, text1);
const img1: ImageObj = createImgSlideObj({x:200, y: 140}, {w:150, h:180}, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6G5ZoAKwc2A_8NEaiGWClkMoxVo_0xUf8Q&s");
slide1 = addSlideObj(slide1, img1);
slide1 = changeBackgroundToColor(slide1, {type: BgType.color, color: "#a3a0b7"})
    

let slide2: SlideType = createSlide();
const text2: TextObj = createTextSlideObj({x: 90, y: 0}, {w:150, h:90});
text2.textcontent = "Слайд 2";
slide2 = addSlideObj(slide2, text2);
slide2 = changeBackgroundToImage(slide2, {type: BgType.image, url: "https://avatars.mds.yandex.net/i?id=dd140583fc56ad01241b887adfee0161_l-4770953-images-thumbs&n=13"});

slide1.isSelected = true;
presentation = addSlide(presentation, slide1);
presentation = addSlide(presentation, slide2);

const text: TextObj = createTextSlideObj({x: 100, y: 100}, {w:150, h:90});
text.textcontent = "Добавили текст";

const defaultEditor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjId: presentation.slides[0].content[0].id
    }
}

export {
    defaultEditor,
    text
}