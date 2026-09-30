// Zähler: zählt eine Summe hoch, sobald sie sichtbar wird (z. B. beim Öffnen des Reiters „Abschluss“).
// Ohne Skript oder bei „Bewegung reduzieren“ bleibt der fertige Betrag stehen.
(() => {
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (ruhig || !("IntersectionObserver" in window)) return;

  const format = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dauer = 1400;

  function zaehle(el) {
    const ziel = parseFloat(el.dataset.count);
    const start = performance.now();
    function schritt(jetzt) {
      const t = Math.min((jetzt - start) / dauer, 1);
      const weich = 1 - Math.pow(1 - t, 3); // am Ende langsamer werden
      el.textContent = format.format(ziel * weich);
      if (t < 1) requestAnimationFrame(schritt);
    }
    requestAnimationFrame(schritt);
  }

  // Wird bei jedem Sichtbarwerden neu gestartet, auch nach einem Reiterwechsel
  const beobachter = new IntersectionObserver(eintraege => {
    eintraege.forEach(e => { if (e.isIntersecting) zaehle(e.target); });
  }, { threshold: 0.6 });

  document.querySelectorAll("[data-count]").forEach(el => beobachter.observe(el));
})();
