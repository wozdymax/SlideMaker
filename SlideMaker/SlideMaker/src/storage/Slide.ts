import { v4 as uuidv4 } from 'uuid';
import { EditorType } from './EditorType';

export type SlideType = {
    id: string;
    background: BgImage | BgColor;
    content: SlideObj[];
    isSelected: boolean;
}

export enum BgType {
    image, 
    color,
}

export enum SlideObjType {
    image, 
    text,
}

export type BgImage = {
    type: BgType.image;
    url: string;
}

export type BgColor = {
    type: BgType.color;
    color: string;
}

export type SlideObj = ImageObj | TextObj;

export type ImageObj = BaseSlideObj & {
    type: SlideObjType.image;
    url: string;
}

export type TextObj = BaseSlideObj & {
    type: SlideObjType.text;
    textcontent: string | null;
    font: string;
    fontsize: number;
    fontcolor: string;
    bgcolor: string | null;
}

export type BaseSlideObj = {
    id: string;
    position: Position;
    size: Size;
    isSelected:boolean;
}

export type Position = {
    x: number;
    y: number;
}


export type Size = {
    w: number;
    h: number;
}

const createSlide = (): SlideType => {
    return{id: uuidv4(), background: {type:BgType.color, color: "#ffffff"}, content: [], isSelected: false};
}

const createBaseSlideObj = (pos: Position, size: Size): BaseSlideObj => {
    if (size.h > 0 && size.w > 0){
        return{id: uuidv4(), position: {...pos}, size: {...size}, isSelected: false}
    }
    return{id: uuidv4(), position: {...pos}, size: {w: 50, h: 50}, isSelected: false}
}

const createTextSlideObj = (pos: Position, size: Size): TextObj => {
    const baseElem: BaseSlideObj = createBaseSlideObj(pos, size);
    return{...baseElem, type: SlideObjType.text, textcontent: null, font: "Arial", fontsize: 18, fontcolor: "#000000", bgcolor: null};
}

const createImgSlideObj = (pos: Position, size: Size, url: string): ImageObj => {
    const baseElem: BaseSlideObj = createBaseSlideObj(pos, size);
    return{...baseElem, type: SlideObjType.image, url: url};
}

const addSlideObj = (slide: SlideType, elem: SlideObj): SlideType => {
    return{...slide, content: [...slide.content, {...elem}]};
}

const deleteSlideObjs = (slide: SlideType, ids: string[]): SlideType => {
    const newSlideObjs = slide.content.filter((elem) => !ids.includes(elem.id));
    return{...slide, content: newSlideObjs};
}

const changeObjPosition = (elem: SlideObj, newPos: Position): SlideObj => {
    return{...elem, position: {...newPos}};
} 

const changeObjSize = (elem: SlideObj, newSize: Size): SlideObj => {
    if (newSize.h > 0 && newSize.w > 0){
        return{...elem, size: {...newSize}};
    }
    return{...elem}
} 

const editTextContent = (textElem: TextObj, newText: string): TextObj => {
    return{...textElem, textcontent: newText};
}

const editTextFont = (textElem: TextObj, newFont: string): TextObj => {
    return{...textElem, font: newFont};
}

const editTextFontsize = (textElem: TextObj, newFontsize: number): TextObj => {
    if(newFontsize >= 0){
        return{...textElem, fontsize: newFontsize};
    }
    return{...textElem};
}

const editTextFontcolor = (textElem: TextObj, newFontcolor: string): TextObj => {
    return{...textElem, fontcolor: newFontcolor};
}
const editTextBgcolor = (textElem: TextObj, newBgcolor: string | null): TextObj => {
    return{...textElem, bgcolor: newBgcolor};
}

const changeBackgroundToImage = (slide: SlideType, img: BgImage): SlideType => {
    return{...slide, background: {...img}};
}

const changeBackgroundToColor = (slide: SlideType, newColor: BgColor): SlideType => {
    return{...slide, background: {...newColor}};
}

const updateSlideObjPosition = (editor: EditorType, params: {slideObjId: string, newPosition: Position}): EditorType => {

    const activeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selectionSlide?.selectedSlideId)
   
    const newSlides = [...editor.presentation.slides]

    const getNewObj = (slides: SlideType[], objectId: string): SlideObj | null => {
        const selectedObj = slides[activeSlideIndex].content.findIndex((elem) => elem.id == objectId)
        if (selectedObj === -1) {
            return null;
        }   
        const newObj: SlideObj = slides[activeSlideIndex].content[selectedObj];
        slides[activeSlideIndex] = deleteSlideObjs(newSlides[activeSlideIndex], [slides[activeSlideIndex].content[selectedObj].id])
        return newObj
    }

    let newPosObj = getNewObj(newSlides, params.slideObjId);
    if (newPosObj === null) {
        return{...editor}
    }
    newPosObj = changeObjPosition(newPosObj, params.newPosition);
    newSlides[activeSlideIndex] = addSlideObj(newSlides[activeSlideIndex], newPosObj)
    
    return {
        ...editor,
        presentation: {
            ...editor.presentation, 
            slides: newSlides
        }
    }
}

const setBackgroundColor = (editor: EditorType, newColor: string): EditorType => {
    const activeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == editor.selectionSlide?.selectedSlideId)
   
    const newSlides = [...editor.presentation.slides]
    newSlides[activeSlideIndex] = changeBackgroundToColor(newSlides[activeSlideIndex], {type: BgType.color, color: newColor})
    return {
        ...editor,
        presentation: {
            ...editor.presentation, 
            slides: newSlides
        }
    }
}


export {
    createSlide, 
    createBaseSlideObj,
    createTextSlideObj,
    createImgSlideObj,
    addSlideObj, 
    deleteSlideObjs, 
    changeObjPosition, 
    changeObjSize, 
    editTextContent,
    editTextFont,
    editTextFontsize,
    editTextFontcolor,
    editTextBgcolor,
    changeBackgroundToImage,
    changeBackgroundToColor,
    updateSlideObjPosition,
    setBackgroundColor
}
