import { renderMoodSelection } from './mood.mjs';
import { initStorage } from './storage.mjs';

function initApp() {
  initStorage();        // Ensures localStorage structure exists
  renderMoodSelection(); // Default view on load
}

document.addEventListener('DOMContentLoaded', initApp);
