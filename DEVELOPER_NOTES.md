# Typetests Synchronization Rules & Guidelines

> [!IMPORTANT]
> **Strict Synchronization Rule:**
> Elke wijziging die wordt doorgevoerd in de code van de hoofdbestanden in **`all test/`** (HTML, CSS of JS) moet **1-op-1** worden doorgevoerd in de bijbehorende iframe-varianten in **`iframe version/`** (en vice versa). Dit zorgt ervoor dat de code en werking van de standalone website-versie en de iframe-versies altijd exact synchroon lopen.

---

## Iframe-specifieke uitzonderingen (Behouden bij kopiëren)

Wanneer er code van `all test/` wordt overgezet naar de submappen in `iframe version/`, moeten de volgende aanpassingen en uitzonderingen **altijd handmatig worden toegepast of behouden**:

### 1. HTML Opschoning (`index.html`)
De HTML van de iframe-versies moet gestript blijven van website-omhulsel. 
* **Verwijderen:** De oranje deal-bar, de website-header (`.site-header`), de hero banner (`.hero-section`), de intro-sectie (`.intro-strip`), de schermafbeeldingen-sectie (`.screens-section`) en de footer (`.site-footer`).
* **Klassen:** De `<body>` tag moet altijd de klasse `iframe-mode` behouden:
  ```html
  <body class="iframe-mode">
  ```

### 2. JavaScript Aanpassingen (`script.js`)
* **Beveiligde Start Knop:** Omdat de hero banner ontbreekt, moet de startMissionHero listener ALTIJD beveiligd zijn:
  ```javascript
  if (startMissionHero) {
    startMissionHero.addEventListener("click", (event) => {
      // ...
    });
  }
  ```
* **Automatische Hoogte Resizer:** Voeg onderaan elk scriptbestand altijd het dynamic height script toe om scrollbalken in WordPress te voorkomen:
  ```javascript
  function sendHeightToParent() {
    const height = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'resize-iframe', height: height }, '*');
    }
  }
  window.addEventListener('load', sendHeightToParent);
  window.addEventListener('resize', sendHeightToParent);

  const observer = new MutationObserver(sendHeightToParent);
  observer.observe(document.body, { attributes: true, childList: true, subtree: true });
  ```
* **Vaste Variant:** De initialisatie onderaan het script moet hardcoded verwijzen naar de specifieke variant van die map, zodat deze niet uit de browser-cache (`localStorage`) van de andere varianten kan putten:
  * **kluis-iframe:** `const savedVariant = "kluis";`
  * **normal-iframe:** `const savedVariant = "normal";`
  * **leaderboard-iframe:** `const savedVariant = "leaderboard";`
  * **dossier-iframe:** `const savedVariant = "dossier";`

### 3. CSS Aanpassingen (`styles.css`)
* **Spelletjes verbergen:** Om de iframes compact te houden, moet de typespelletjes-sectie in de CSS van de iframe-versies altijd verborgen blijven. Zorg ervoor dat deze regel onderaan `styles.css` staat:
  ```css
  /* Hide games footer in iframe mode */
  .vault-games-footer {
    display: none !important;
  }
  ```
