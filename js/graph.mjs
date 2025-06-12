import { renderMoodSelection } from './mood.mjs';

export function renderMoodGraph() {
  const app = document.getElementById('app');
  const entries = JSON.parse(localStorage.getItem('entries')) || [];
  
  console.log('Entries from localStorage:', entries); // Debug log

  const moodCounts = {
    Happy: 0,
    Sad: 0,
    Stressed: 0,
    Excited: 0
  };

  // Count each mood with case normalization
  entries.forEach(entry => {
    console.log('Processing entry mood:', entry.mood); // Debug log
    const moodKey = entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1).toLowerCase();
    console.log('Normalized mood key:', moodKey); // Debug log
    if (moodCounts[moodKey] !== undefined) {
      moodCounts[moodKey]++;
    }
  });

  console.log('Final mood counts:', moodCounts); // Debug log

  // Calculate max value for scaling bars
  const maxCount = Math.max(...Object.values(moodCounts), 1);

  // Build HTML
  app.innerHTML = `
    <h2>Mood Frequency Graph</h2>
    <div class="bar-graph">
      ${Object.entries(moodCounts).map(([mood, count]) => `
        <div class="bar-group mood-${mood.toLowerCase()}">
          <div class="bar-vertical" style="height: ${(count / maxCount) * 100}%;">
            <span class="bar-label">${count}</span>
            <div class="tooltip">${mood}: ${count} ${count === 1 ? 'entry' : 'entries'}</div>
          </div>
          <div class="bar-name">${mood}</div>
        </div>
      `).join('')}
    </div>
    <button id="back">Back</button>
  `;

  document.getElementById('back').addEventListener('click', renderMoodSelection);
}
