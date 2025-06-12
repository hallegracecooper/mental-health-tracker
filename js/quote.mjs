export async function showDailyQuote() {
  const app = document.getElementById('quote-container');
  if (!app) {
    console.warn('Quote container not found');
    return;
  }

  const fallbackQuote = {
    q: "Take a deep breath. You've got this.",
    a: "Unknown"
  };

  try {
    const response = await fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/today');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const quote = data[0]?.q || fallbackQuote.q;
    const author = data[0]?.a || fallbackQuote.a;

    app.innerHTML = `
      <blockquote class="quote">
        "${quote}"<br>
        <span class="author">– ${author}</span>
      </blockquote>
    `;
  } catch (error) {
    console.error('Error fetching quote:', error);
    app.innerHTML = `
      <blockquote class="quote">
        "${fallbackQuote.q}"<br>
        <span class="author">– ${fallbackQuote.a}</span>
      </blockquote>
    `;
  }
}
