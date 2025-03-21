import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
    <StrictMode>
        <Home />
    </StrictMode>
)
