import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { addEditorChangeHandler, getEditor } from './storage/editor.ts'


const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <App editor={getEditor()} />
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()