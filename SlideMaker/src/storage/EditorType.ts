import { PresentationType } from "./Presentation.ts";

export type SelectionSlide = {
    selectedSlideId: string;
};

export type SelectionObj = {
    selectedObjId: string;
};

export type EditorType = {
    presentation: PresentationType;
    selectionSlide: SelectionSlide;
    selectionObj: SelectionObj;
};
