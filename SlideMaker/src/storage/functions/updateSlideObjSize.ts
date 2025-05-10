import { EditorType } from "../EditorType";
import { Size, SlideType, SlideObj, deleteSlideObjs, changeObjSize, addSlideObj } from "../Slide";

const updateSlideObjSize = (editor: EditorType, params: { slideObjId: string; newSize: Size }): EditorType => {
    console.log(params);
    const activeSlideIndex = editor.presentation.slides.findIndex(
        (slide) => slide.id == editor.selectionSlide?.selectedSlideId,
    );

    const newSlides = [...editor.presentation.slides];

    const getNewObj = (slides: SlideType[], objectId: string): SlideObj | null => {
        const selectedObj = slides[activeSlideIndex].content.findIndex((elem) => elem.id == objectId);
        if (selectedObj === -1) {
            return null;
        }
        const newObj: SlideObj = slides[activeSlideIndex].content[selectedObj];
        slides[activeSlideIndex] = deleteSlideObjs(newSlides[activeSlideIndex], [
            slides[activeSlideIndex].content[selectedObj].id,
        ]);
        return newObj;
    };

    let newSizeObj = getNewObj(newSlides, params.slideObjId);
    if (newSizeObj === null) {
        return { ...editor };
    }
    newSizeObj = changeObjSize(newSizeObj, params.newSize);
    newSlides[activeSlideIndex] = addSlideObj(newSlides[activeSlideIndex], newSizeObj);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
};

export { updateSlideObjSize };
