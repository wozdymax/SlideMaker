import {PresentationType} from "./Presentation.ts";
type SelectionType = {
    selectedObjId: string | null,
    selectedSlideId: string,
}
type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
}
export type {
    EditorType,
    SelectionType,
}