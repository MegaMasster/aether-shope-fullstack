import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/shared/assets/styles/index.css'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)