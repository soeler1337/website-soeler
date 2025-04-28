// Loading-Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    const container = document.querySelector('.icon-links');
    if (container) {
        const scrollWidth = container.scrollWidth;
        const visibleWidth = container.clientWidth;
        const scrollTo = (scrollWidth - visibleWidth) / 2;
        container.scrollLeft = scrollTo;
    }
});

// Twitch Streamtitel laden (vereinfachte Version)
async function loadTwitchStreamTitle() {
    const titleElement = document.getElementById('stream-title');
    titleElement.textContent = "Aktueller Stream oder letztes VOD von Soeler";
}

loadTwitchStreamTitle();
