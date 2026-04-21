// Theme
function initTheme() {
  var saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeBtn(saved);
}
function updateThemeBtn(theme) {
  var btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}
function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme");
  var next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeBtn(next);
}

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

// Stream title
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
      } else {
        titleEl.textContent = "Aktuell offline";
        if (dotEl) dotEl.hidden = true;
      }
    })
    .catch(function() {
      var titleEl = document.getElementById("stream-title");
      titleEl.classList.remove("skeleton-text");
      titleEl.textContent = "Status nicht verfügbar";
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

// Boot
window.addEventListener("load", function() {
  initTheme();
  buildIcons();
  document.getElementById("loader").style.display = "none";
  document.body.classList.add("loaded");
  var strip = document.querySelector(".icon-links");
  if (strip) strip.scrollLeft = (strip.scrollWidth - strip.clientWidth) / 2;
  setTimeout(function() { var el = document.getElementById("stream-section"); if (el) el.classList.add("visible"); }, 100);
  setTimeout(function() { var el = document.querySelector(".gallery"); if (el) el.classList.add("visible"); }, 500);
  setTimeout(function() { var el = document.querySelector(".contact-form"); if (el) el.classList.add("visible"); }, 900);
  loadStreamTitle();
  setCopyrightYear();
  initBackToTop();
  var btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", toggleTheme);
});
