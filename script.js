// Loading-Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// Twitch Streamtitel laden (vereinfachte Version)
async function loadTwitchStreamTitle() {
    const titleElement = document.getElementById('stream-title');
    titleElement.textContent = "Aktueller Stream oder letztes VOD von Soeler";
}

loadTwitchStreamTitle();
