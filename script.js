// Icons
function buildIcons() {
  var iconContainer = document.querySelector(".icon-links");
  SITE_CONFIG.icons.forEach(function(icon, index) {
    var container = document.createElement("div");
    container.classList.add("icon-container");
    var link = document.createElement("a");
    link.href = icon.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = icon.name;
    var img = document.createElement("img");
    img.src = icon.iconPath;
    img.alt = icon.name;
    img.loading = "lazy";
    var label = document.createElement("span");
    label.classList.add("icon-label");
    label.textContent = icon.name;
    link.appendChild(img);
    container.appendChild(link);
    container.appendChild(label);
    iconContainer.appendChild(container);
    setTimeout(function() { container.classList.add("visible"); }, 120 * index);
  });
}

// Stream: load player only when live, show offline card otherwise
function showStreamPlayer() {
  var player = document.getElementById("twitch-embed");
  if (player && !player.src) player.src = player.dataset.src;
  if (player) player.hidden = false;
  var offline = document.getElementById("stream-offline");
  if (offline) offline.hidden = true;
}

function showStreamOffline() {
  var player = document.getElementById("twitch-embed");
  if (player) player.hidden = true;
  var offline = document.getElementById("stream-offline");
  if (offline) offline.hidden = false;
}

function loadStreamTitle() {
  fetch("https://soeler-twitch-proxy.vercel.app/api/stream")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var titleEl = document.getElementById("stream-title");
      var dotEl   = document.getElementById("live-dot");
      titleEl.classList.remove("skeleton-text");
      if (data.live) {
        titleEl.textContent = "Live: " + data.title;
        if (dotEl) dotEl.hidden = false;
        showStreamPlayer();
      } else {
        titleEl.textContent = "Aktuell offline";
        if (dotEl) dotEl.hidden = true;
        showStreamOffline();
      }
      if (data.profile_image_url) {
        var avatar = document.getElementById("hero-avatar");
        if (avatar) avatar.src = data.profile_image_url;
      }
    })
    .catch(function() {
      var titleEl = document.getElementById("stream-title");
      titleEl.classList.remove("skeleton-text");
      titleEl.textContent = "Status nicht verfügbar";
      // Proxy down: show the player as safe fallback
      showStreamPlayer();
    });
}

// Playlist facades: build placeholder, load YouTube iframe on click
function buildPlaylistFacades() {
  document.querySelectorAll(".playlist-card[data-list]").forEach(function(card) {
    var facade = document.createElement("button");
    facade.className = "pl-facade";
    facade.setAttribute("aria-label", "Playlist abspielen");
    facade.innerHTML = '<span class="pl-play">&#9654;</span><span class="pl-hint">Playlist laden</span>';
    facade.addEventListener("click", function() {
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/videoseries?list=" + card.dataset.list + "&autoplay=1";
      iframe.allow = "autoplay; encrypted-media; fullscreen";
      iframe.allowFullscreen = true;
      iframe.title = card.querySelector("h3") ? card.querySelector("h3").textContent : "YouTube Playlist";
      card.replaceChild(iframe, facade);
    });
    card.appendChild(facade);
  });
}

// Playlist carousel
function initCarousel() {
  var track = document.querySelector(".carousel-track");
  var prevBtn = document.querySelector(".carousel-prev");
  var nextBtn = document.querySelector(".carousel-next");
  if (!track || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    var card = track.querySelector(".playlist-card:not([hidden])");
    return card ? card.offsetWidth + 20 : 320;
  }

  prevBtn.addEventListener("click", function() {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });
  nextBtn.addEventListener("click", function() {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  function updateButtons() {
    prevBtn.style.opacity = track.scrollLeft > 10 ? "1" : "0.35";
    nextBtn.style.opacity = (track.scrollLeft + track.clientWidth < track.scrollWidth - 10) ? "1" : "0.35";
  }
  track.addEventListener("scroll", updateButtons, { passive: true });
  updateButtons();
}

// Playlist show more / collapse
function initPlaylistToggle() {
  var btn = document.getElementById("playlist-toggle");
  if (!btn) return;

  var hiddenCards = document.querySelectorAll(".carousel-track .playlist-card[hidden]");
  if (!hiddenCards.length) { btn.style.display = "none"; return; }

  var expanded = false;

  btn.addEventListener("click", function() {
    expanded = !expanded;
    hiddenCards.forEach(function(card) {
      if (expanded) { card.removeAttribute("hidden"); }
      else          { card.setAttribute("hidden", ""); }
    });
    btn.textContent = expanded
      ? "Weniger anzeigen"
      : "Alle 16 Playlists anzeigen";
    if (!expanded) {
      document.querySelector(".carousel-track").scrollLeft = 0;
    }
  });
}

// Back to top
function initBackToTop() {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function() {
    btn.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Copyright year
function setCopyrightYear() {
  var el = document.getElementById("copyright-year");
  if (el) el.textContent = new Date().getFullYear();
}

// Boot — DOMContentLoaded fires as soon as the HTML is parsed,
// no waiting for iframes/images like window "load" would
document.addEventListener("DOMContentLoaded", function() {
  buildIcons();
  document.getElementById("loader").classList.add("done");
  document.body.classList.add("loaded");

  var strip = document.querySelector(".icon-links");
  if (strip) strip.scrollLeft = (strip.scrollWidth - strip.clientWidth) / 2;

  setTimeout(function() { var el = document.getElementById("stream-section"); if (el) el.classList.add("visible"); }, 80);
  setTimeout(function() { var el = document.getElementById("focus-section");  if (el) el.classList.add("visible"); }, 240);
  setTimeout(function() { var el = document.querySelector(".gallery");         if (el) el.classList.add("visible"); }, 400);
  setTimeout(function() { var el = document.querySelector(".connect-section"); if (el) el.classList.add("visible"); }, 560);

  loadStreamTitle();
  setCopyrightYear();
  initBackToTop();
  buildPlaylistFacades();
  initCarousel();
  initPlaylistToggle();
});
