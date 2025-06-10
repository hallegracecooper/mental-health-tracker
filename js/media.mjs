console.log("✅ media.mjs file loaded");

export function handleMediaContent(mood) {
  console.log("Received mood:", mood);
  console.log("Mood type:", typeof mood);
  
  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'media-box';

  const mediaMap = {
    Happy: {
      title: "Feel-Good Music",
      embedUrl: "https://www.youtube.com/embed/ZbZSe6N_BXs?enablejsapi=1" // Pharrell - Happy
    },
    Sad: {
      title: "Comforting Video",
      embedUrl: "https://www.youtube.com/embed/YQHsXMglC9A?enablejsapi=1" // Adele - Hello
    },
    Stressed: {
      title: "Relaxing Music",
      embedUrl: "https://www.youtube.com/embed/2OEL4P1Rz04?enablejsapi=1" // Calm piano
    },
    Excited: {
      title: "High-Energy Vibes",
      embedUrl: "https://www.youtube.com/embed/fLexgOxsZu0?enablejsapi=1" // Bruno Mars - Uptown Funk
    }
  };

  console.log("Available mood keys:", Object.keys(mediaMap));

  // Normalize mood casing
  const formattedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  console.log("Formatted mood:", formattedMood);
  
  const media = mediaMap[formattedMood];
  console.log("Found media object:", media);

  if (!media) {
    console.warn("No media matched. Returning fallback.");
    mediaContainer.innerHTML = `
      <div style="padding: 1em; background: #ffebee; border-radius: 4px; margin: 1em 0;">
        <p style="color: #c62828; margin: 0;">Debug Info:</p>
        <ul style="color: #c62828; margin: 0.5em 0;">
          <li>Received mood: "${mood}"</li>
          <li>Formatted mood: "${formattedMood}"</li>
          <li>Available moods: ${Object.keys(mediaMap).join(', ')}</li>
        </ul>
      </div>
    `;
    return mediaContainer;
  }

  console.log("Generating media container for:", media.title);
  const html = `
    <h3>${media.title}</h3>
    <div class="video-wrapper">
      <iframe 
        width="560" 
        height="315" 
        src="${media.embedUrl}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  `;
  console.log("Generated HTML:", html);
  mediaContainer.innerHTML = html;
  return mediaContainer;
}
