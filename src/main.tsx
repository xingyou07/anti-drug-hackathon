import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { AppStateProvider } from '@/state/AppStateContext';
import { CrisisSheetProvider } from '@/state/CrisisSheetContext';
import { registerServiceWorker } from '@/lib/register-sw';

const container = document.getElementById('root');
if (!container) throw new Error('Root element missing');

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      {/* CrisisSheetProvider wraps AppStateProvider: the help sheet must not
          depend on persisted state being readable. */}
      <CrisisSheetProvider>
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </CrisisSheetProvider>
    </BrowserRouter>
  </StrictMode>,
);

registerServiceWorker();
