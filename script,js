// Light/Dark-Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    // Theme-Icon wechseln
    toggleButton.textContent = document.body.classList.contains('light-mode') ? "☀️" : "🌙";
});

// Easteregg Messages
const messages = [
    "Pixel perfekt, Baby.",
    "Rolling for Initiative...",
    "Stream loading... Please stand by.",
    "Caution: Highly Addictive Content.",
    "I eat crits for breakfast.",
    "Welcome to the Soelerversum.",
    "Creating chaos since forever.",
    "Glitched into greatness."
];

// Easteregg Trigger
const icons = document.querySelectorAll('.icon-links a img');
const easteregg = document.getElementById('easteregg');

icons.forEach(icon => {
    icon.addEventListener('mousedown', () => {
        showRandomMessage();
    });
    icon.addEventListener('touchstart', () => {
        showRandomMessage();
    });
});

function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    easteregg.textContent = messages[randomIndex];
    easteregg.style.display = 'block';
    setTimeout(() => {
        easteregg.style.display = 'none';
    }, 3000);
}

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
