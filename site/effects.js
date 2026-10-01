// Kleine Effekte der Startseite. Ohne Skript bleibt alles lesbar und im Endzustand.
(() => {
  const ruhig = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const angehalten = () => document.getElementById("still")?.checked === true;
  if (!("IntersectionObserver" in window)) return;

  // 1. Endlos-Animationen außerhalb des sichtbaren Bereichs anhalten (spart Rechenzeit).
  //    Die CSS-Regel :is(.stage, .device-art, .cup-scene).is-offscreen * pausiert sie.
  const sichtbar = new IntersectionObserver(eintraege => {
    eintraege.forEach(e => e.target.classList.toggle("is-offscreen", !e.isIntersecting));
  });
  document.querySelectorAll(".stage, .device-art, .cup-scene").forEach(el => sichtbar.observe(el));

  // 2. Zähler: zählt eine Summe hoch, sobald sie sichtbar wird (z. B. beim Öffnen des Reiters „Abschluss“).
  //    Bei „Bewegung reduzieren“ oder angehaltener Animation steht sofort der Endbetrag da.
  const format = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dauer = 1400;
  const laeuft = new WeakMap(); // je Element die laufende Animation, damit nie zwei parallel laufen

  function zaehle(el) {
    const ziel = parseFloat(el.dataset.count);
    cancelAnimationFrame(laeuft.get(el));
    if (ruhig() || angehalten()) { el.textContent = format.format(ziel); return; }
    const start = performance.now();
    function schritt(jetzt) {
      const t = Math.min((jetzt - start) / dauer, 1);
      const weich = 1 - Math.pow(1 - t, 3); // am Ende langsamer werden
      el.textContent = format.format(ziel * weich);
      if (t < 1) laeuft.set(el, requestAnimationFrame(schritt));
    }
    laeuft.set(el, requestAnimationFrame(schritt));
  }

  // Startet bei jedem Sichtbarwerden neu, auch nach einem Reiterwechsel
  const zaehler = new IntersectionObserver(eintraege => {
    eintraege.forEach(e => { if (e.isIntersecting) zaehle(e.target); });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach(el => zaehler.observe(el));
})();
