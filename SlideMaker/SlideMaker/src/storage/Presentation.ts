import { SlideType } from "./Slide";


export type PresentationType = {
    name: string;
    slides: SlideType[];
}

const createPresentation = (): PresentationType => {
    return { name: "New Presentation", slides: []}
}

const renamePresentation = (pres: PresentationType, newName: string): PresentationType => {
    if (newName.trim() === "") {
        return {...pres, name: "New Presentation"};
    }
    return {...pres, name: newName};
}


export {createPresentation, renamePresentation};
