const SITE_CONFIG = {
  // Ein Tipp pro Tag, rotiert automatisch (Tag im Jahr % Anzahl)
  dmTips: [
    "Sag nicht Nein, sag 'Ja, aber…'. Spieler-Ideen aufgreifen macht jede Session besser als jedes vorbereitete Skript.",
    "Bereite Situationen vor, keine Lösungen. Deine Spieler finden eh einen Weg, an den du nie gedacht hast.",
    "Gib jedem NPC eine Eigenheit: eine Geste, ein Sprachtick, ein Geruch. Mehr braucht es nicht, damit er im Kopf bleibt.",
    "Wenn die Gruppe plant, lehn dich zurück und hör zu. Die besten Plot-Hooks schreiben deine Spieler selbst.",
    "Ein Kampf wird spannender durch das Terrain, nicht durch mehr HP. Gib ihnen was zum Klettern, Umwerfen und Anzünden.",
    "Fail forward: Ein Patzer sollte die Story verkomplizieren, nicht stoppen. 'Du öffnest das Schloss, aber laut.'",
    "Stiehl schamlos. Jede Serie, jedes Buch, jedes Spiel ist Beute. Deine Spieler merken es nicht, und wenn doch, feiern sie es.",
    "Der Würfel ist nicht dein Chef. Wenn ein Wurf die Session ruinieren würde, war es der falsche Wurf.",
    "Session 0 ist keine Option, sondern Pflicht. Erwartungen klären spart dir zehn unangenehme Gespräche später.",
    "Beende jede Session mit einem Cliffhanger oder einer offenen Frage. Das ist der Grund, warum alle nächste Woche wiederkommen.",
    "Namen vergessen? Halte eine Liste mit 10 vorbereiteten NPC-Namen bereit. Nichts verrät Improvisation schneller als 'ähh… Bob'.",
    "Belohne kreative Ideen auch wenn sie scheitern. Sonst versuchen deine Spieler irgendwann nur noch das Sichere.",
    "Nicht jede Session braucht Kampf. Ein gutes Sozial-Encounter oder ein Rätsel bleibt oft länger in Erinnerung.",
    "Beschreibe mit allen Sinnen: Wie riecht der Dungeon? Was hört man in der Taverne? Zwei Sätze Atmosphäre schlagen zwei Absätze Exposition.",
    "Deine Schurken brauchen ein nachvollziehbares Motiv. Ein Bösewicht, den man versteht, ist gruseliger als einer, der nur böse ist."
  ],
  // Bausteine für den NPC-Generator
  npc: {
    vornamen: ["Grimbold", "Elara", "Thorin", "Mirabel", "Kazrak", "Lysandra", "Fennwick", "Odessa", "Baldric", "Nyx", "Torvald", "Isolde", "Quillon", "Vesper", "Ragnar", "Seraphina", "Dorian", "Wilhelmina", "Zephyr", "Agatha"],
    beinamen: ["Steinbart", "vom Nebeltal", "die Flinke", "Eisenherz", "der Stille", "Dreifinger", "von Rabenfels", "die Weise", "Schattenwandler", "der Lachende", "Sturmgeboren", "die Unbeugsame", "Aschenkind", "der Ehrliche (angeblich)", "von der letzten Taverne", "Silberzunge", "die Namenlose", "der Zweite", "Moosfuß", "Glutauge"],
    berufe: ["Schmied:in", "Wirt:in", "Kräuterhexe", "Stadtwache", "Barde ohne Publikum", "Alchemist:in", "Grabräuber:in (im Ruhestand)", "Schreiber:in", "Kartograph:in", "Bestattungsunternehmer:in", "Rattenfänger:in", "Hofnarr a.D.", "Schmuggler:in", "Priester:in eines vergessenen Gottes", "Söldner:in"],
    macken: ["sammelt heimlich Schmetterlinge", "spricht mit dem eigenen Schwert", "schuldet jedem in der Stadt Geld", "hat panische Angst vor Hühnern", "lügt grundsätzlich beim Würfeln", "zitiert ständig die eigene Großmutter", "trägt immer zwei linke Stiefel", "verwechselt ständig Namen", "flüstert, wenn es wichtig wird", "behauptet, mal ein Drache gewesen zu sein", "isst nur Dinge, die mit K anfangen", "führt Buch über jede Beleidigung", "hat den eigenen Namen mal verwettet", "erzählt jedem vom gleichen Traum", "hält die Party für eine Halluzination"]
  },
  icons: [
    {
      name: "Loredumb",
      url: "https://www.loredumb.com",
      iconPath: "icons/podcast.png"
    },
    {
      name: "Discord",
      url: "https://discord.gg/UDwEWXBc4z",
      iconPath: "icons/discord.png"
    },
    {
      name: "soeler1337",
      url: "https://www.instagram.com/soeler1337",
      iconPath: "icons/instagram.png"
    },
    {
      name: "soelers_ecke",
      url: "https://www.instagram.com/soelers_ecke",
      iconPath: "icons/instagram.png"
    },
    {
      name: "soeler1337",
      url: "https://youtube.com/@soeler1337",
      iconPath: "icons/youtube.png"
    },
    {
      name: "soelers_ecke",
      url: "https://www.youtube.com/@soelers_ecke",
      iconPath: "icons/youtube.png"
    },
    {
      name: "soeler1337",
      url: "https://www.twitch.tv/soeler1337",
      iconPath: "icons/twitch.png"
    },
    {
      name: "soeler1337",
      url: "https://www.tiktok.com/@soeler1337",
      iconPath: "icons/tiktok.png"
    },
    {
      name: "soelers_ecke",
      url: "https://www.tiktok.com/@soelers_ecke",
      iconPath: "icons/tiktok.png"
    },
    {
      name: "Pixelart",
      url: "https://www.pixilart.com/soeler/gallery",
      iconPath: "icons/pixelart.png"
    },
    {
      name: "Donation",
      url: "https://soundalerts.com/@soeler1337",
      iconPath: "icons/donation.png"
    },
    {
      name: "Ko-Fi",
      url: "https://ko-fi.com/soeler",
      iconPath: "icons/kofi.png"
    }
  ]
};
