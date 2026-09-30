# nally-website

Die Website von NALLY unter https://nallypos.de (Repo: github.com/nallypos/nally-website) – statisches HTML/CSS ohne Build-Schritt,
ohne Cookies und ohne Drittanbieter.

- `site/` wird unverändert veröffentlicht (GitHub Pages über `.github/workflows/pages.yml`).
- `site/CNAME` bindet die Domain `nallypos.de`.

## Umzug zu einem anderen Hoster

Inhalt von `site/` hochladen, danach die DNS-Einträge von `nallypos.de` auf den neuen Hoster zeigen
lassen. `CNAME` und `.nojekyll` werden dort nicht gebraucht.

## Vor dem Start (Checkliste)

- [ ] Platzhalter (gelb markiert, `class="todo"`) in `impressum.html` und `datenschutz.html` füllen
- [ ] Postfach `kontakt@nallypos.de` einrichten und in der Datenschutzerklärung den Anbieter nennen
- [ ] Prüfung durch `recht-compliance` (Impressum, Datenschutz) und `qualitaet-verifikation`
- [ ] `<meta name="robots" content="noindex">` aus allen Seiten entfernen
