# 🐍 Horoskop Hadonoše (Ophiuchus Bot)

> *"Vesmír je chaos, hvězdy jsou jen plyn a tvůj osud je generován náhodným číslem."*

Vítejte v projektu **Horoskop Hadonoše**. Toto není váš běžný, sluníčkový horoskop. Toto je automatizovaný generátor existenciální satiry pro třinácté znamení zvěrokruhu, které nikdo nechtěl, ale všichni ho potřebujeme.

## 🌌 O co jde?

Tento skript generuje denní "horoskopy", které kombinují:
1.  **Všeobecnou únavu vesmíru** (Openings)
2.  **Absurdní zdůvodnění** (Tensions)
3.  **Karmickou předpověď** (Karmas)
4.  **Symbol dne** (zcela náhodné předměty jako "Ztracená ponožka")
5.  **Meta komentář** (disclaimer, že to nemáte brát vážně)

Výsledek je deterministický – pro daný den vygeneruje vždy stejný text (díky seedování datem). Takže pokud máte špatný den, mají ho všichni Hadonoši stejně. Spravedlivé, ne?

## 🚀 Jak to funguje

Skript je napsaný v **Node.js**.

1.  Vezme aktuální datum (UTC).
2.  Vytvoří z něj numerický seed.
3.  Použije LCG (Linear Congruential Generator) pro výběr položek z `src/data.js`.
4.  Sestaví text.
5.  (Volitelně) Odešle výsledek na **Mastodon**.

## 🛠 Instalace a spuštění

Stačí vám Node.js a trocha odvahy.

```bash
# Spuštění generátoru (výpis do konzole)
node src/index.js
```

### Mastodon Integrace

Pokud chcete, aby Hadonoš křičel do digitální prázdnoty (Mastodonu), nastavte tyto proměnné prostředí (např. v `.env` nebo v GitHub Secrets):

*   `MASTODON_INSTANCE`: URL vaší instance (např. `https://mastodonczech.cz`)
*   `MASTODON_TOKEN`: Váš přístupový token

Skript automaticky detekuje prostředí (CI/CD) a pokud má tokeny, odešle status.

## 📝 Ukázka výstupu

> 18. ledna 2026
>
> Komunikační šumy se množí rychleji než nevyžádané rady, protože diplomacie je dnes nedostatkové zboží, improvizace vítězí.
>
> Tvá karma je jako křivý obraz. Všichni to vidí, jen ty ne.
>
> Symbol dne: 404 Not Found
>
> Výklad nebere v potaz realitu. Pokud se shoduje, je to náhoda.
>
> #hadonos #horoskop #satira

## 🤝 Přispívání

Chcete přidat další důvod k depresi nebo absurdní symbol? Editujte `src/data.js`. Zachovejte prosím tón "rezignovaného intelektuála".

---
*Vytvořeno s láskou k entropii.*