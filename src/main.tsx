import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { DataProvider } from './context/DataContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <App />
  </DataProvider>
);

