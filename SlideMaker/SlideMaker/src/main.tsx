import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createPresentation } from './storage/Presentation.ts'
import { SelectionType } from './storage/Selection.ts'

let sel: SelectionType;

const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <App presentation={createPresentation()} selection={sel} />
        </StrictMode>,
    )
}

render()