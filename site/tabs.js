// Reiter nach WAI-ARIA (Tabs-Muster): Klick, Pfeiltasten, Pos1/Ende.
// Ohne Skript bleiben alle Panels sichtbar; erst hier werden die übrigen ausgeblendet.
document.querySelectorAll("[role=tablist]").forEach(liste => {
  const tabs = [...liste.querySelectorAll("[role=tab]")];

  function zeige(tab) {
    tabs.forEach(t => {
      const an = t === tab;
      t.setAttribute("aria-selected", an);
      t.tabIndex = an ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !an;
    });
  }

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => zeige(t));
    t.addEventListener("keydown", e => {
      let n;
      if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") n = tabs[0];
      else if (e.key === "End") n = tabs[tabs.length - 1];
      else return;
      e.preventDefault();
      zeige(n);
      n.focus();
    });
  });

  zeige(tabs.find(t => t.getAttribute("aria-selected") === "true") || tabs[0]);
});
