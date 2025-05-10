import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { EditorType } from "../EditorType";
import { validatePresentation } from "../schema";

const saveStateToLocalStorage = (state: EditorType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("editorState", serializedState);
    } catch (err) {
        console.error("Ошибка сохранения состояния в localStorage", err);
    }
};
const loadStateFromLocalStorage = (): EditorType | undefined => {
    try {
        const serializedState = localStorage.getItem("editorState");
        if (!serializedState) return undefined;
        const parsedState = JSON.parse(serializedState);
        if (!validatePresentation(parsedState)) {
            console.warn("Некорректные данные в localStorage. Загружается состояние по умолчанию.");
            return undefined;
        }
        return parsedState as EditorType;
    } catch (err) {
        console.error("Ошибка загрузки состояния из localStorage", err);
        return undefined;
    }
};
const preloadedState = loadStateFromLocalStorage();
const saveStateEnhancer =
    (createStore: any) =>
    (...args: any) => {
        const store = createStore(...args);
        store.subscribe(() => {
            saveStateToLocalStorage(store.getState());
        });
        return store;
    };
const store = createStore(editorReducer, preloadedState, saveStateEnhancer);

export { store };
