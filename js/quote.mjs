export async function showDailyQuote() {
  const app = document.getElementById('quote-container');
  try {
    const response = await fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/today');
    const data = await response.json();
    const quote = data[0]?.q;
    const author = data[0]?.a;

    app.innerHTML = `
      <blockquote class="quote">
        "${quote}"<br>
        <span class="author">– ${author}</span>
      </blockquote>
    `;
  } catch (error) {
    console.error('Error fetching quote:', error);
    app.innerHTML = `<p class="quote-error">Could not load quote. Try again later.</p>`;
  }
}
