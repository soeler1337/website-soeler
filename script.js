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

// Relative date in German
function relativeDate(published) {
  var days = Math.floor((Date.now() - new Date(published).getTime()) / 86400000);
  if (days <= 0) return "Heute";
  if (days === 1) return "Gestern";
  return "vor " + days + " Tagen";
}

// Latest videos from Soelers Ecke (section stays hidden on failure)
function loadLatestVideos() {
  fetch("https://soeler-twitch-proxy.vercel.app/api/latest-video")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var videos = data.videos || (data.video ? [data.video] : []);
      if (!videos.length) return;
      var grid = document.getElementById("lv-grid");
      if (!grid) return;

      videos.slice(0, 3).forEach(function(v) {
        var card = document.createElement("a");
        card.className = "lv-card";
        card.href = v.url || "https://www.youtube.com/@soelers_ecke";
        card.target = "_blank";
        card.rel = "noopener";

        var thumb = document.createElement("div");
        thumb.className = "lv-thumb";
        var img = document.createElement("img");
        img.src = v.thumbnail;
        img.alt = v.title;
        img.loading = "lazy";
        var play = document.createElement("span");
        play.className = "lv-play";
        play.innerHTML = "&#9654;";
        thumb.appendChild(img);
        thumb.appendChild(play);

        var info = document.createElement("div");
        info.className = "lv-info";
        if (v.isShort) {
          var badge = document.createElement("span");
          badge.className = "lv-badge";
          badge.textContent = "Short";
          info.appendChild(badge);
        }
        var title = document.createElement("h3");
        title.textContent = v.title;
        info.appendChild(title);
        if (v.published) {
          var date = document.createElement("span");
          date.className = "lv-date";
          date.textContent = relativeDate(v.published);
          info.appendChild(date);
        }

        card.appendChild(thumb);
        card.appendChild(info);
        grid.appendChild(card);
      });

      document.getElementById("latest-video-section").hidden = false;
    })
    .catch(function() { /* section stays hidden */ });
}

// DM-Tipp des Tages (deterministic by day of year)
function initDmTip() {
  var el = document.getElementById("dm-tip");
  var tips = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.dmTips : null;
  if (!el || !tips || !tips.length) return;
  var now = new Date();
  var dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  el.textContent = tips[dayOfYear % tips.length];
}

// NPC-Generator
function initNpcGen() {
  var btn = document.getElementById("npc-btn");
  var out = document.getElementById("npc-result");
  var npc = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG.npc : null;
  if (!btn || !out || !npc) return;

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  btn.addEventListener("click", function() {
    out.textContent =
      pick(npc.vornamen) + " " + pick(npc.beinamen) +
      " — " + pick(npc.berufe) + ", " + pick(npc.macken) + ".";
  });
}

// d20 roll on the offline card
function initD20() {
  var die = document.getElementById("d20-die");
  var out = document.getElementById("d20-result");
  if (!die || !out) return;

  var rolling = false;

  die.addEventListener("click", function() {
    if (rolling) return;
    rolling = true;
    die.classList.add("rolling");
    out.className = "d20-result";
    out.innerHTML = "&nbsp;";

    var ticks = 0;
    var interval = setInterval(function() {
      die.textContent = 1 + Math.floor(Math.random() * 20);
      ticks++;
      if (ticks >= 10) {
        clearInterval(interval);
        var result = 1 + Math.floor(Math.random() * 20);
        die.textContent = result;
        die.classList.remove("rolling");

        if (result === 20) {
          out.textContent = "Natürliche 20! Ein Omen — der nächste Stream wird legendär. 🎉";
          out.classList.add("crit");
        } else if (result === 1) {
          out.textContent = "Kritischer Patzer! Der Würfel-Gott verlangt ein Opfer. Versuch's nochmal. 💀";
          out.classList.add("fail");
        } else if (result >= 15) {
          out.textContent = result + " — Starker Wurf! Damit überredest du jeden Wirt.";
        } else if (result >= 8) {
          out.textContent = result + " — Solide. Nicht heldenhaft, aber solide.";
        } else {
          out.textContent = result + " — Autsch. Der DM grinst schon verdächtig.";
        }
        rolling = false;
      }
    }, 70);
  });
}

// Discord member count on the connect button
function loadDiscordCount() {
  fetch("https://discord.com/api/v10/invites/UDwEWXBc4z?with_counts=true")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var el = document.getElementById("discord-count");
      if (el && data.approximate_member_count) {
        el.textContent = "· " + data.approximate_member_count + " Member";
      }
    })
    .catch(function() { /* leave button as is */ });
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
  loadLatestVideos();
  loadDiscordCount();
  initDmTip();
  initNpcGen();
  initD20();
  setCopyrightYear();
  initBackToTop();
  buildPlaylistFacades();
  initCarousel();
  initPlaylistToggle();
});
