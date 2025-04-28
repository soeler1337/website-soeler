function buildIcons() {
    const iconContainer = document.querySelector('.icon-links');

    SITE_CONFIG.icons.forEach((icon, index) => {
        const container = document.createElement('div');
        container.classList.add('icon-container');

        const link = document.createElement('a');
        link.href = icon.url;
        link.target = '_blank';

        const img = document.createElement('img');
        img.src = icon.iconPath;
        img.alt = icon.name;

        const label = document.createElement('span');
        label.classList.add('icon-label');
        label.textContent = icon.name;

        link.appendChild(img);
        container.appendChild(link);
        container.appendChild(label);
        iconContainer.appendChild(container);

        // Verzögert die Sichtbarkeit
        setTimeout(() => {
            container.classList.add('visible');
        }, 150 * index); // Jeder Icon bekommt 150ms Verzögerung extra
    });
}



function loadStreamTitle() {
    fetch(`https://api.twitch.tv/helix/streams?user_login=${SITE_CONFIG.twitch.username}`, {
        headers: {
            'Client-ID': SITE_CONFIG.twitch.clientId,
            'Authorization': `Bearer ${SITE_CONFIG.twitch.accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.length > 0) {
            document.getElementById('stream-title').textContent = data.data[0].title;
        } else {
            document.getElementById('stream-title').textContent = 'Aktuell offline';
        }
    })
    .catch(error => {
        console.error('Fehler beim Abrufen des Streamtitels:', error);
        document.getElementById('stream-title').textContent = 'Fehler beim Laden';
    });
};
function checkTokenAge() {
    const createdAt = new Date(SITE_CONFIG.twitch.tokenCreatedAt);
    const now = new Date();
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);

    if (diffDays > 50) {
        console.warn('%c⚠️ Dein Twitch Access Token ist älter als 50 Tage. Bitte bald erneuern!', 'color: orange; font-weight: bold;');
    } else {
        console.log('%c✅ Access Token Alter okay: ' + Math.round(diffDays) + ' Tage alt.', 'color: green;');
    }
};
// Loading-Screen
window.addEventListener('load', () => {
	buildIcons();
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    const container = document.querySelector('.icon-links');
    if (container) {
        const scrollWidth = container.scrollWidth;
        const visibleWidth = container.clientWidth;
        const scrollTo = (scrollWidth - visibleWidth) / 2;
        container.scrollLeft = scrollTo;
    }
	document.body.classList.add('loaded');

    setTimeout(() => {
        document.getElementById('stream-section').classList.add('visible');
    }, 100); // Start schnell

    setTimeout(() => {
        document.querySelector('.gallery').classList.add('visible');
    }, 500); // leicht später

    setTimeout(() => {
        document.querySelector('.contact-form').classList.add('visible');
    }, 900); // noch etwas später
	checkTokenAge();
	loadStreamTitle();
});