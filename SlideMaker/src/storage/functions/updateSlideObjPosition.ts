import { EditorType } from "../EditorType";
import { Position, SlideType, SlideObj, deleteSlideObjs, changeObjPosition, addSlideObj } from "../Slide";

const updateSlideObjPosition = (
    editor: EditorType,
    params: { slideObjId: string; newPosition: Position },
): EditorType => {
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

    let newPosObj = getNewObj(newSlides, params.slideObjId);
    if (newPosObj === null) {
        return { ...editor };
    }
    newPosObj = changeObjPosition(newPosObj, params.newPosition);
    newSlides[activeSlideIndex] = addSlideObj(newSlides[activeSlideIndex], newPosObj);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
    };
};

export { updateSlideObjPosition };
