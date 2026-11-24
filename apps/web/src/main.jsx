import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './shared/styles/tokens.css';
import './shared/styles/globals.css';
import './shared/styles/utilities.css';

createRoot(document.getElementById('root')).render(<App />);
