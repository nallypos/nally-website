# nally-website

Die Website von NALLY unter https://nallypos.de (Repo: github.com/nallypos/nally-website) – statisches HTML/CSS ohne Build-Schritt,
ohne Cookies und ohne Drittanbieter.

- `site/` wird unverändert veröffentlicht (GitHub Pages über `.github/workflows/pages.yml`, Actions auf Commit-SHA festgelegt, Dependabot hält sie aktuell).
- **Die Domain wird in den Repo-Einstellungen gesetzt, nicht über `site/CNAME`:** Bei Veröffentlichung über einen eigenen Actions-Workflow ignoriert GitHub die CNAME-Datei. `site/CNAME` bleibt nur als Hinweis für einen späteren Umzug.
- Alle Seiten tragen eine Content-Security-Policy per `<meta>`. Deshalb keine Inline-Skripte und keine `style`-Attribute; Skripte kommen als Datei (`tabs.js`), Abstände über Hilfsklassen in `styles.css`.

## Freischaltung (Reihenfolge wichtig)

1. Zwei-Faktor-Anmeldung für das Konto `nallypos` aktiv.
2. Domain `nallypos.de` im Konto verifizieren (GitHub → Settings → Pages → Add a domain, TXT-Eintrag `_github-pages-challenge-nallypos` bei Namecheap).
3. Repo → Settings → Pages: Quelle „GitHub Actions“, Custom Domain `nallypos.de` eintragen.
4. Erst dann bei Namecheap: A-Einträge `@` auf 185.199.108.153, .109.153, .110.153, .111.153, AAAA auf 2606:50c0:8000::153 bis 8003::153, CNAME `www` auf `nallypos.github.io`. Keine Wildcards. MX- und TXT-Einträge von Google nicht anfassen.
5. Nach Ausstellung des Zertifikats „Enforce HTTPS“ einschalten.
6. `noindex` aus allen Seiten entfernen und „Stand“ in `datenschutz.html` setzen.

## Umzug zu einem anderen Hoster

Inhalt von `site/` hochladen, danach die DNS-Einträge von `nallypos.de` auf den neuen Hoster zeigen
lassen. Beim neuen Hoster die Content-Security-Policy besser als HTTP-Header setzen. `CNAME` und `.nojekyll` werden dort nicht gebraucht.
Kommen Anmeldung, Bestellung oder ein Kundenportal dazu, muss die Seite vorher umziehen (Nutzungsbedingungen von GitHub Pages).

## Vor dem Start (Checkliste)

- [x] Impressum und Datenschutz ausgefüllt (bis auf „Stand“)
- [x] Prüfung durch `recht-compliance`, `qualitaet-verifikation`, `code-review`, `code-review-sicherheit`
- [ ] Freigabe der kassenrechtlichen Aussagen durch `pos-kassen-compliance`
- [ ] Nachprüfung durch `qualitaet-verifikation`
- [ ] Freischaltung wie oben
