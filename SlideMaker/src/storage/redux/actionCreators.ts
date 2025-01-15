import * as SlideActionCreators from "./slideActionCreators.ts";
import * as SelectionActionCreators from "./selectionActionCreators";
import * as PresentationActionCreators from "./presentationActionCreators";
import * as EditorActionCreators from "./editorActionCreators.ts";

export default {
    ...SlideActionCreators,
    ...SelectionActionCreators,
    ...PresentationActionCreators,
    ...EditorActionCreators,
};
