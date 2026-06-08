// ═══════════════════════════════════════════════════════════════════
// CONFIGURATION & GLOBAL CONSTANTS
// ═══════════════════════════════════════════════════════════════════
const TOTAL_SECONDS_MAP = {
  normal: 60,
  leaderboard: 60,
  kluis: 60,
  dossier: 60
};

const INITIAL_WORDS = 14;
const WORD_BATCH = 9;
const BUFFER_CHARS = 50;
const INITIAL_VISIBLE_CHARS = 100;

// ═══════════════════════════════════════════════════════════════════
// DIFFICULTY WORD POOLS
// ═══════════════════════════════════════════════════════════════════

const DIFFICULTY_TIERS_KLUIS = {
  easy: [
    "Het systeem is nu aan het laden en zoekt naar de kluis.",
    "Er is een kluis gevonden op niveau drie van het gebouw.",
    "De kluis heeft vijf bouten en een zwaar slot.",
    "Het scannen van de eerste bout is begonnen.",
    "De eerste bout is gekraakt en het groene licht gaat aan.",
    "Het systeem gaat nu verder met de tweede bout.",
    "De code van de tweede bout is blauw.",
    "Er wordt een sein gestuurd naar de basis.",
    "De basis stuurt de data terug naar het systeem.",
    "De derde bout gaat langzaam los.",
    "Het alarm van de kluis staat nog aan.",
    "De vierde bout heeft een rode code.",
    "Het slot draait naar links en dan naar rechts.",
    "De hendel draait naar beneden en de deur gaat open.",
    "In de kluis liggen geheime bestanden.",
    "Het systeem slaat alles op en wist de sporen.",
    "De spion sluipt door de gang naar de kluis.",
    "Het is stil in het gebouw en niemand is wakker.",
    "De code is lang maar het systeem werkt snel.",
    "Alle bouten zijn los en de kluis staat open."
  ],
  medium: [
    "Het systeem zoekt naar de kluis, maar het netwerk is zwaar beveiligd.",
    "De kluis is gevonden op niveau drie, achter een stalen deur.",
    "Elke bout heeft een eigen code, en ze moeten allemaal gekraakt worden.",
    "De eerste bout reageert op het signaal, het groene licht gaat branden.",
    "Het scannen duurt langer dan verwacht, want de beveiliging is sterk.",
    "De basis stuurt extra data, zodat het systeem sneller kan werken.",
    "De derde bout heeft een dubbele code, maar het systeem vindt hem snel.",
    "Het alarm gaat bijna af, dus het systeem moet snel handelen.",
    "De vierde bout is lastiger dan de rest, want hij heeft een timer.",
    "De laatste bout is wit, en dat betekent dat hij extra sterk is.",
    "Na het kraken van alle bouten, draait de hendel automatisch open.",
    "De bestanden in de kluis zijn versleuteld, maar niet onbreekbaar.",
    "De spion wacht geduldig, terwijl het systeem de code ontcijfert.",
    "Elke seconde telt, want het alarm kan elk moment afgaan.",
    "De missie verloopt volgens plan, alle systemen werken naar behoren.",
    "Het team op de basis volgt alles live mee via het netwerk.",
    "De gang is donker en stil, alleen het tikken van het toetsenbord klinkt.",
    "De vijand vermoedt niets, de operatie blijft volledig onzichtbaar.",
    "Zodra de kluis open is, moet de spion snel de bestanden pakken.",
    "Het systeem wist alle sporen, zodat niemand weet dat we hier waren."
  ],
  hard: [
    "De kluis is zwaar beveiligd; alleen de beste spionnen kunnen hem kraken.",
    "\"Kraak de code!\" fluistert Miss J via het oortje. \"We hebben weinig tijd.\"",
    "Het systeem meldt: beveiligingsniveau kritiek; doorgaan op eigen risico.",
    "Wie heeft deze kluis ontworpen? De beveiliging is bijna onmogelijk!",
    "De spion vraagt zich af: is dit een valstrik, of de echte kluis?",
    "Eén fout en het alarm gaat af; concentratie is nu alles wat telt.",
    "De code bestaat uit letters, symbolen en een reeks van tekens.",
    "\"Goed gedaan!\" zegt de stem op de radio. \"Ga door naar bout drie.\"",
    "Het systeem detecteert een extra laag beveiliging: een tijdslot!",
    "De timer tikt door; nog maar dertig seconden voor het alarm afgaat.",
    "\"Rustig blijven,\" zegt Miss J. \"Je kunt dit; je bent getraind.\"",
    "De vijand heeft camera's overal; de spion moet onzichtbaar blijven.",
    "Is de code correct? Het systeem controleert: ja, bout vier is los!",
    "De laatste bout heeft drie lagen: een code, een timer en een scan.",
    "\"Missie geslaagd!\" klinkt het door het oortje. De kluis staat open!",
    "Het team juicht; de bestanden zijn veilig en de vijand weet van niets.",
    "De spion fluistert: \"Dit was krap; de volgende keer moet het sneller.\"",
    "Elke missie is anders; soms makkelijk, soms bijna onmogelijk.",
    "De geheime bestanden bevatten informatie over vijandelijke plannen.",
    "\"Terugtrekken!\" beveelt Miss J. De missie is voltooid; tijd om te gaan."
  ],
  expert: [
    "De kluis staat op server 192.168.1.47; het wachtwoord is X7-bQ9#mK.",
    "Bout 1 heeft code A4-F8, bout 2 is R2-D2 en bout 3 is J9-K3.",
    "Het systeem meldt: \"Error 403; toegang geweigerd op poort 8080.\"",
    "De timer staat op 00:30; de code is 7491-BRAVO-28 en de kluis beeft.",
    "Agent 007 rapporteert: \"Sector 12, verdieping 3, kluis nummer 48.\"",
    "De versleuteling gebruikt AES-256; dat zijn 2^256 mogelijke combinaties!",
    "\"Code rood op niveau 5!\" schreeuwt de operator. Tijd: 14:37:02.",
    "Het IP-adres 10.0.0.1 stuurt 4.096 pakketjes per seconde naar het doel.",
    "De 5 bouten hebben codes: #A1b, #B2c, #C3d, #D4e en #E5f.",
    "Missie X-47: ontcijfer kluis 12B op verdieping 3 voor 15:00 uur.",
    "Het wachtwoord is 8 tekens lang: Kz4!pL9@ en het verandert elke 30s.",
    "De firewall blokkeert poorten 22, 80, 443 en 8443; alleen 3389 is open.",
    "Agent-ID: SP-2847; missie-code: FALCON-19; locatie: 51.2194, 4.4025.",
    "De frequentie is 147.300 MHz; het signaal heeft een sterkte van -42 dBm.",
    "\"Status update: bout 4/5 ontcijferd; resterend: 1; ETA: 12 seconden.\"",
    "Het encryptie-algoritme draait op 3.2 GHz en kraakt 10^6 codes per uur.",
    "Beveiligingscode: V8k#2Lm!; vervaldatum: 18-05-2026; status: GEHEIM.",
    "De dataset bevat 2.400 bestanden (47,3 GB) verspreid over 12 servers.",
    "Coördinaten: N51 13'10\" O4 24'09\"; ETA voltooiing: 22:15 uur.",
    "De kluis reset na 45s; de sleutel verandert dan naar X2-M7-Q4@!."
  ]
};

const DIFFICULTY_TIERS_DOSSIER = {
  easy: [
    "Het systeem is nu aan het laden en zoekt naar het dossier.",
    "Er is een geheim dossier gevonden op de server.",
    "Het dossier heeft vijf versleutelde secties en een code.",
    "Het decoderen van de eerste sectie is begonnen.",
    "De eerste laag is gekraakt en het groene licht gaat aan.",
    "Het systeem gaat nu verder met de tweede sectie.",
    "De code van de tweede sectie is enorm lang.",
    "Er wordt een sein gestuurd naar de basis.",
    "De basis stuurt de data terug naar het systeem.",
    "De derde sectie wordt langzaam ontcijferd.",
    "Het alarm van het netwerk staat nog aan.",
    "De vierde sectie heeft een rode code.",
    "De blur verdwijnt en we zien een oor van de kat.",
    "De afbeelding wordt steeds iets meer zichtbaar.",
    "In het dossier zit een super coole poster verstopt.",
    "Het systeem slaat alles op en wist de sporen.",
    "De spion zoekt snel door de data naar de poster.",
    "Het is stil in het gebouw en niemand is wakker.",
    "De code is lang maar het systeem werkt snel.",
    "Alle secties zijn ontcijferd en de poster is onthuld."
  ],
  medium: [
    "Het systeem zoekt naar het dossier, maar het netwerk is beveiligd.",
    "Het dossier is gevonden op niveau drie, achter een vuurmuur.",
    "Elke sectie heeft een eigen code, en ze moeten allemaal gekraakt worden.",
    "De eerste sectie reageert op het signaal, het groene licht gaat branden.",
    "Het ontcijferen duurt langer dan verwacht, want de beveiliging is sterk.",
    "De basis stuurt extra data, zodat het systeem sneller kan werken.",
    "De derde sectie heeft een dubbele code, maar het systeem vindt hem snel.",
    "Het alarm gaat bijna af, dus het systeem moet snel handelen.",
    "De vierde sectie is lastiger dan de rest, want hij heeft een timer.",
    "De foto van de kat wordt langzaam scherp, en dat is een goed teken.",
    "Na het ontcijferen van alle secties, wordt de poster automatisch zichtbaar.",
    "De bestanden in het dossier zijn versleuteld, maar niet onbreekbaar.",
    "De spion wacht geduldig, terwijl het systeem de tekst ontcijfert.",
    "Elke seconde telt, want het netwerk kan elk moment uitvallen.",
    "De missie verloopt volgens plan, alle systemen werken naar behoren.",
    "Het team op de basis volgt alles live mee via een veilige verbinding.",
    "De terminal knippert zacht, alleen het tikken van het toetsenbord klinkt.",
    "De vijand vermoedt niets, de operatie blijft volledig onzichtbaar.",
    "Zodra het dossier open is, moet de spion snel de afbeelding downloaden.",
    "Het systeem wist alle sporen, zodat niemand weet dat we hier waren."
  ],
  hard: [
    "Het dossier is zwaar beveiligd; alleen de beste spionnen kunnen het kraken.",
    "\"Kraak de code!\" fluistert Miss J via het oortje. \"We hebben weinig tijd.\"",
    "Het systeem meldt: beveiligingsniveau kritiek; doorgaan op eigen risico.",
    "Wie heeft dit dossier ontworpen? De versleuteling is bijna onmogelijk!",
    "De spion vraagt zich af: is dit een valstrik, of het echte document?",
    "Eén fout en de verbinding verbreekt; concentratie is nu alles wat telt.",
    "De code bestaat uit letters, symbolen en een reeks van vreemde tekens.",
    "\"Goed gedaan!\" zegt de stem op de radio. \"Ga door naar sectie drie.\"",
    "Het systeem detecteert een extra laag beveiliging: een dynamisch script!",
    "De timer tikt door; nog maar dertig seconden voor de data wordt gewist.",
    "\"Rustig blijven,\" zegt Miss J. \"Je kunt dit; je bent hierop getraind.\"",
    "De kattenposter wordt zichtbaar; de spion moet onzichtbaar blijven.",
    "Is de sleutel correct? Het systeem controleert: ja, sectie vier is los!",
    "De laatste sectie heeft drie lagen: een code, een timer en een scan.",
    "\"Missie geslaagd!\" klinkt het door het oortje. Het dossier staat open!",
    "Het team juicht; de afbeelding is onthuld en de vijand weet van niets.",
    "De spion fluistert: \"Dit was krap; de volgende keer moet het sneller.\"",
    "Elke missie is anders; soms is de code simpel, soms bijna onmogelijk.",
    "Het geheime dossier bevat informatie over vijandelijke plannen.",
    "\"Terugtrekken!\" beveelt Miss J. De missie is voltooid; we hebben de kat."
  ],
  expert: [
    "Het dossier staat op server 192.168.1.47; het wachtwoord is X7-bQ9#mK.",
    "Sectie 1 heeft code A4-F8, sectie 2 is R2-D2 en sectie 3 is J9-K3.",
    "Het systeem meldt: \"Error 403; toegang geweigerd op poort 8080.\"",
    "De timer staat op 00:30; de decryptiecode is 7491-BRAVO-28, blijf typen.",
    "Agent 007 rapporteert: \"Sector 12, verdieping 3, data file nummer 48.\"",
    "De versleuteling gebruikt AES-256; dat zijn 2^256 mogelijke combinaties!",
    "\"Code rood op niveau 5!\" schreeuwt de operator. Tijd: 14:37:02.",
    "Het IP-adres 10.0.0.1 stuurt 4.096 pakketjes per seconde naar het doel.",
    "De 5 secties hebben codes: #A1b, #B2c, #C3d, #D4e en #E5f.",
    "Missie X-47: ontcijfer bestand 12B op verdieping 3 voor 15:00 uur.",
    "Het wachtwoord is 8 tekens lang: Kz4!pL9@ en het verandert elke 30s.",
    "De firewall blokkeert poorten 22, 80, 443 en 8443; alleen 3389 is open.",
    "Agent-ID: SP-2847; missie-code: FALCON-19; locatie: 51.2194, 4.4025.",
    "De frequentie is 147.300 MHz; het signaal heeft een sterkte van -42 dBm.",
    "\"Status update: sectie 4/5 ontcijferd; resterend: 1; ETA: 12 seconden.\"",
    "Het encryptie-algoritme draait op 3.2 GHz en kraakt 10^6 codes per uur.",
    "Beveiligingscode: V8k#2Lm!; vervaldatum: 18-05-2026; status: GEHEIM.",
    "De dataset bevat 2.400 bestanden (47,3 GB) verspreid over 12 servers.",
    "Coördinaten: N51 13'10\" O4 24'09\"; ETA voltooiing: 22:15 uur.",
    "De blur reset na 45s; de sleutel verandert dan naar X2-M7-Q4@!."
  ]
};

const DIFFICULTY_TIERS_NORMAL = {
  easy: [
    "Welkom bij je eerste missie als spion.",
    "Je bent nu op een geheime plek, wees heel stil.",
    "De grote baas heeft een plan bedacht, en wij voeren het uit.",
    "Wij moeten heel snel de code kraken.",
    "Kijk goed naar het scherm voor je, en neem je tijd.",
    "Typ alle letters rustig na, maar vergeet de punten niet.",
    "Miss J houdt de boel veilig via de camera.",
    "Ze zegt dat de grote deur bijna open is.",
    "Maak geen fouten, want het alarm is erg scherp.",
    "We zoeken naar de map met blauwe papieren.",
    "Als we die hebben, gaan we heel snel weer weg.",
    "Blijf focussen op de woorden, je bent een natuurtalent.",
    "De missie is bijna voorbij, we hebben alle data binnen.",
    "Je doet het fantastisch, rekruut."
  ],
  medium: [
    "Blijf focussen op de letters op het scherm; nauwkeurigheid is belangrijker dan pure snelheid.",
    "De vijandige spion sluipt door de schaduwen, maar wij zijn hem een stap voor.",
    "Houd je vingers in de basispositie op het toetsenbord om sneller te kunnen typen.",
    "Professor Qwerty controleert de verbinding, de decryptie verloopt soepel.",
    "De missie vereist concentratie; typ elke zin zonder haast maar met precisie.",
    "Het trainingsprogramma leert je stap voor stap blindtypen met alle tien vingers.",
    "Typen met tien vingers zorgt voor een gezonde houding en voorkomt vermoeidheid.",
    "Elke dag vijftien minuten oefenen is de sleutel tot succes in de typecursus."
  ],
  hard: [
    "Miss J spreekt: \"Sla de briefing niet over tenzij je direct klaar bent voor actie!\"",
    "De vijand gebruikt encryptie, maar onze supercomputers kraken de codes automatisch.",
    "Toetsenbordbeheersing is een essentieel wapen voor elke moderne geheim agent.",
    "Gebruik de Shift-toets voor hoofdletters en vergeet de leestekens niet correct te typen.",
    "De missie is bijna volbracht; houd vol en behaal een topsnelheid op deze test!"
  ],
  expert: [
    "Agent TM-9824 meldt: verbinding tot stand gebracht met IP-adres 192.168.2.1.",
    "Statusrapport: 100% accuraatheid behaald op sectie A; snelheid bedraagt 140 APM.",
    "De codesensor reageert op de invoer: X7-bQ9#mK; de poorten 80 en 443 zijn beveiligd."
  ]
};

// ═══════════════════════════════════════════════════════════════════
// BRIEFING SLIDES
// ═══════════════════════════════════════════════════════════════════
const storySlides = [
  "Hallo, ik ben miss J.",
  "Deze video heb ik opgenomen om nieuwe leerlingen te helpen bij het slagen van hun eerste test.",
  "Als je slaagt, willen we je maar al te graag op onze school hebben, want we zijn altijd op zoek naar goede hulp.",
  "Als je slaagt, krijg je les van mij. Dat zou heel leuk zijn.",
  "Om te kijken of jij de aangewezen persoon bent om ons te helpen, heeft professor Qwerty hier een test voor gemaakt.",
  "Succes!"
];

const endStorySlides = [
  "Geweldig, je hebt het gehaald!",
  "Dat is best knap hoor, gefeliciteerd!",
  "Je bent nu officieel uitgenodigd om les te krijgen op de Super Spy School.",
  "Ik hoop je snel te zien op onze school.",
  "Misschien kom je wel bij mij in de klas, dat zou ik heel leuk vinden.",
  "Dan kan ik je alle letters leren en dan kan ik je leren omgaan met spionnen gadgets, zodat je op je eerste echte spionnenmissie mag gaan.",
  "Tot ziens en eh... hopelijk tot gauw!"
];

const LEADERBOARD_STATIC_TEXT = "Welkom bij de Super Spy School. Hier leer je snel en nauwkeurig typen. Dit is erg belangrijk voor een geheim agent. Blijf rustig kijken naar de letters en maak geen fouten. Professor Qwerty en Miss J helpen je om de test te halen. Veel succes met je eerste missie! Jouw training begint vandaag. Samen zorgen we voor een veilige verbinding en kraken we alle codes. Een goede spion moet heel geduldig zijn en altijd alert blijven. Kijk goed om je heen en let op de details. Elke letter die je typt brengt ons dichter bij de oplossing. Het is belangrijk dat je jouw vingers op de juiste plaats houdt. Zo kun je blind typen en hoef je niet steeds naar beneden te kijken. Oefen elke dag een klein beetje om nog sneller te worden. De computer registreert al jouw toetsen en berekent je score in realtime. Geef niet op als het een keer fout gaat, want van fouten kun je juist heel veel leren. Wij geloven in jouw talent en wensen je heel veel plezier tijdens deze spannende missie. Zet hem op en laat zien hoe snel jij kunt typen!";

// ═══════════════════════════════════════════════════════════════════
// STATE VARIABLES
// ═══════════════════════════════════════════════════════════════════
let currentTest = "kluis";
let DIFFICULTY_TIERS = DIFFICULTY_TIERS_KLUIS;
let TOTAL_SECONDS = TOTAL_SECONDS_MAP[currentTest];

let running = false;
let testArmed = false;
let testReadyToFinish = false;
let capsLockOn = false;
let testFinished = false;
let paused = false;
let pauseStartTime = 0;
let totalPausedTime = 0;
let startedAt = 0;
let timerId = 0;
let finalElapsed = TOTAL_SECONDS;
let resultStats = null;
let targetWords = [];
let wordCursor = 0;
let targetText = "";
let audioContext = null;
let soundEnabled = true;
let lastTickSound = 0;
let lastMilestone = 0;
let mistakeIndex = -1;
let mistakeCount = 0;
let mistakeHistory = {};
let onboardingComplete = false;
let briefingPlaying = false;
let storyTimeoutId = 0;
let typewriterId = 0;
let activeMissionView = null; // initialized below
let viewTransitioning = false;
let selectedDifficulty = "dynamic";
let currentDifficultyLabel = "Basis";
let calibrationComplete = false;

// ═══════════════════════════════════════════════════════════════════
// DOM ELEMENTS
// ═══════════════════════════════════════════════════════════════════
const testSelectorDropdown = document.querySelector("#testSelectorDropdown");
const testSelectorHeader = document.querySelector("#testSelectorHeader");
const currentTestDisplay = document.querySelector("#currentTestDisplay");
const testSelectorOptions = document.querySelectorAll("#testSelectorDropdown .dropdown-list li");
const missionStage = document.querySelector("#missionStage");
const morphFlash = document.querySelector("#morphFlash");

const storyStage = document.querySelector("#storyStage");
const missionLayout = document.querySelector("#missionLayout");
const endBriefingStage = document.querySelector("#endBriefingStage");
const resultPanel = document.querySelector("#resultPanel");

const briefingVideo = document.querySelector("#briefingVideo");
const endBriefingVideo = document.querySelector("#endBriefingVideo");
const startLiveBadge = document.querySelector("#startLiveBadge");
const storyText = document.querySelector("#storyText");
const endBriefingText = document.querySelector("#endBriefingText");
const storyProgress = document.querySelectorAll(".story-progress span");

const playBriefingButton = document.querySelector("#playBriefingButton");
const beginMissionButton = document.querySelector("#beginMissionButton");
const skipEndBriefingButton = document.querySelector("#skipEndBriefingButton");
const startMissionHero = document.querySelector("#startMissionHero");

const startButton = document.querySelector("#startButton");
const finishButton = document.querySelector("#finishButton");
const resetButton = document.querySelector("#resetButton");
const retryResultButton = document.querySelector("#retryResultButton");

// Shared results page stats
const completeWpm = document.querySelector("#completeWpm");
const completeAccuracy = document.querySelector("#completeAccuracy");
const completeMistakes = document.querySelector("#completeMistakes");
const completeCoins = document.querySelector("#completeCoins");
const rankBadge = document.querySelector("#rankBadge");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const trialButton = document.querySelector("#trialButton");
const buyButton = document.querySelector("#buyButton");
const ctaFeedback = document.querySelector("#ctaFeedback");
const unlockNote = document.querySelector("#unlockNote");

// Live position elements for leaderboard test
let previousPosition = null;
const currentPositionEl = document.querySelector(".current-position");
const positionArrowEl = document.querySelector(".position-arrow");

// Multiple target element groups (one per console theme)
const timerEls = document.querySelectorAll(".timer");
const liveWpmEls = document.querySelectorAll(".liveWpm");
const mistakeCountEls = document.querySelectorAll(".mistakeCount");
const accuracyEls = document.querySelectorAll(".accuracy");
const uploadPercentEls = document.querySelectorAll(".uploadPercent");
const missionStatusEls = document.querySelectorAll(".missionStatus");
const codeStatusEls = document.querySelectorAll(".codeStatus");
const difficultyDropdowns = document.querySelectorAll(".difficultyDropdown");
const missionSteps = document.querySelectorAll(".mission-steps li");

// Dynamic selector helpers
function getTestKey() {
  return currentTest === "leaderboard" ? "normal" : currentTest;
}

function getActiveTypingInput() {
  return document.querySelector(`#${getTestKey()}TypingInput`);
}
function getActivePromptTextEl() {
  return document.querySelector(`.${getTestKey()}-prompt-text`);
}
function getActiveUploadFillEl() {
  return document.querySelector(`.${getTestKey()}-upload-fill`);
}
function getActiveTypingOverlay() {
  return document.querySelector(`.${getTestKey()}-typing-overlay`);
}

// Vault specific elements
const vaultDial = document.querySelector("#vaultDial");
const vaultDoor = document.querySelector("#vaultDoor");
const vaultHandle = document.querySelector("#vaultHandle");
let dialRotation = 0;

// Dossier specific elements
const classifiedDoc = document.querySelector("#classifiedDoc");
const docStamp = document.querySelector("#docStamp");
const decryptFill = document.querySelector("#decryptFill");
const sections = [
  document.querySelector("#section1"),
  document.querySelector("#section2"),
  document.querySelector("#section3"),
  document.querySelector("#section4"),
  document.querySelector("#section5")
];
const posterContainer = document.querySelector(".poster-container");

// Multi-value set helpers
function setTimerValue(val) {
  timerEls.forEach(el => el.textContent = val);
}
function setLiveWpmValue(val) {
  liveWpmEls.forEach(el => el.textContent = val);
}
function setMistakeCountValue(val) {
  mistakeCountEls.forEach(el => el.textContent = val);
}
function setAccuracyValue(val) {
  accuracyEls.forEach(el => el.textContent = val);
}
function setUploadPercentValue(val) {
  uploadPercentEls.forEach(el => el.textContent = val);
}
function setMissionStatusText(val) {
  missionStatusEls.forEach(el => el.textContent = val);
}
function setCodeStatusText(val) {
  codeStatusEls.forEach(el => el.textContent = val);
}
function setMissionStep(activeStep) {
  missionSteps.forEach((step) => {
    const stepName = step.dataset.step;
    const isReady = activeStep === "ready";
    step.classList.toggle("active", stepName === activeStep || (isReady && stepName === "typing"));
    step.classList.toggle(
      "complete",
      (isReady && stepName === "briefing") ||
      (activeStep === "typing" && stepName === "briefing") ||
      (activeStep === "result" && stepName !== "result")
    );
  });
}

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════
activeMissionView = storyStage;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ═══════════════════════════════════════════════════════════════════
// ADAPTIVE DIFFICULTY SYSTEM
// ═══════════════════════════════════════════════════════════════════

function getDifficultyWeights(apm) {
  if (selectedDifficulty !== "dynamic") {
    return {
      easy: selectedDifficulty === "easy" ? 1 : 0,
      medium: selectedDifficulty === "medium" ? 1 : 0,
      hard: selectedDifficulty === "hard" ? 1 : 0,
      expert: selectedDifficulty === "expert" ? 1 : 0
    };
  }

  const a = Math.max(0, Math.min(apm, 180));
  if (a < 50) return { easy: 1, medium: 0, hard: 0, expert: 0 };
  if (a < 70) {
    const t = (a - 50) / 20;
    return { easy: 1 - t * 0.6, medium: t * 0.6, hard: 0, expert: 0 };
  }
  if (a < 85) {
    const t = (a - 70) / 15;
    return { easy: 0.1 - t * 0.1, medium: 0.65 - t * 0.25, hard: t * 0.5, expert: 0 };
  }
  if (a < 100) {
    const t = (a - 85) / 15;
    return { easy: 0, medium: 0.25 - t * 0.15, hard: 0.6 - t * 0.15, expert: t * 0.45 };
  }
  if (a < 130) {
    const t = (a - 100) / 30;
    return { easy: 0, medium: 0.05 - t * 0.05, hard: 0.35 - t * 0.15, expert: 0.6 + t * 0.2 };
  }
  return { easy: 0, medium: 0, hard: 0.15, expert: 0.85 };
}

function pickTier(weights) {
  const rand = Math.random();
  let cumulative = 0;
  for (const [tier, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (rand <= cumulative) return tier;
  }
  return "easy";
}

const usedSentences = new Set();
const MAX_USED_MEMORY = 30;

function pickSentence(apm) {
  const weights = getDifficultyWeights(apm);
  const tier = pickTier(weights);
  const pool = DIFFICULTY_TIERS[tier];

  let attempts = 0;
  let sentence;
  do {
    sentence = pool[Math.floor(Math.random() * pool.length)];
    attempts += 1;
  } while (usedSentences.has(sentence) && attempts < pool.length);

  usedSentences.add(sentence);
  if (usedSentences.size > MAX_USED_MEMORY) {
    const firstKey = usedSentences.values().next().value;
    usedSentences.delete(firstKey);
  }
  return sentence;
}

let firstSentenceLength = 0;

function buildInitialText() {
  if (currentTest === "leaderboard") {
    firstSentenceLength = LEADERBOARD_STATIC_TEXT.length;
    return LEADERBOARD_STATIC_TEXT;
  }
  const s1 = pickSentence(0);
  const s2 = pickSentence(0);
  const s3 = pickSentence(0);
  const s4 = pickSentence(0);
  firstSentenceLength = s1.length;
  return [s1, s2, s3, s4].join(" ");
}

function regeneratePreviewText() {
  usedSentences.clear();
  let newText;
  if (currentTest === "leaderboard") {
    newText = LEADERBOARD_STATIC_TEXT;
    firstSentenceLength = newText.length;
  } else {
    const s1 = pickSentence(0);
    const s2 = pickSentence(0);
    const s3 = pickSentence(0);
    const s4 = pickSentence(0);
    firstSentenceLength = s1.length;
    newText = [s1, s2, s3, s4].join(" ");
  }

  targetWords = newText.split(/\s+/);
  targetText = targetWords.join(" ");

  const promptTextEl = getActivePromptTextEl();
  if (!promptTextEl) return;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";
  const finalText = targetText;
  const len = finalText.length;
  let step = 0;
  const totalSteps = 8;

  function scrambleStep() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < len; i++) {
      const span = document.createElement("span");
      span.className = "char";
      const settleAt = Math.floor((i / len) * totalSteps);
      if (step >= settleAt + 2) {
        span.textContent = finalText[i];
        span.classList.add("correct");
      } else {
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.opacity = "0.4";
      }
      fragment.appendChild(span);
    }
    promptTextEl.innerHTML = "";
    promptTextEl.appendChild(fragment);

    step++;
    if (step <= totalSteps + 2) {
      requestAnimationFrame(() => setTimeout(scrambleStep, 35));
    } else {
      renderPrompt();
      const activeInput = getActiveTypingInput();
      if (activeInput && !activeInput.disabled) {
        activeInput.focus();
      }
    }
  }
  scrambleStep();
}

const rollingWindow = [];
const ROLLING_WINDOW_MS = 3000;

function recordKeystroke() {
  const now = performance.now();
  rollingWindow.push(now);
  while (rollingWindow.length > 0 && now - rollingWindow[0] > ROLLING_WINDOW_MS) {
    rollingWindow.shift();
  }
}

function getRollingApm() {
  if (rollingWindow.length < 4) return 0;
  const now = performance.now();
  while (rollingWindow.length > 0 && now - rollingWindow[0] > ROLLING_WINDOW_MS) {
    rollingWindow.shift();
  }
  if (rollingWindow.length < 4) return 0;
  const windowDuration = (now - rollingWindow[0]) / 1000;
  if (windowDuration < 0.5) return 0;
  return Math.round((rollingWindow.length / windowDuration) * 60);
}

function checkCalibration() {
  if (calibrationComplete || selectedDifficulty !== "dynamic") return;
  const typed = getActiveTypingInput().value.length;
  if (typed >= firstSentenceLength) {
    calibrationComplete = true;
  }
}

// ═══════════════════════════════════════════════════════════════════
// GAME MECHANICS
// ═══════════════════════════════════════════════════════════════════

function appendAdaptiveSentences(count) {
  if (currentTest === "leaderboard") {
    const words = LEADERBOARD_STATIC_TEXT.split(/\s+/);
    targetWords.push(...words);
    targetText = targetWords.join(" ");
    return;
  }
  const apm = getRollingApm();
  for (let i = 0; i < count; i += 1) {
    const sentence = pickSentence(apm);
    const words = sentence.split(/\s+/);
    targetWords.push(...words);
  }
  targetText = targetWords.join(" ");

  const weights = getDifficultyWeights(apm);
  const prevLabel = currentDifficultyLabel;
  if (weights.expert > 0.3) currentDifficultyLabel = "Expert";
  else if (weights.hard > 0.3) currentDifficultyLabel = "Hard";
  else if (weights.medium > 0.3) currentDifficultyLabel = "Medium";
  else currentDifficultyLabel = "Basis";

  if (selectedDifficulty === "dynamic" && running && calibrationComplete) {
    const levels = { "Basis": 1, "Medium": 2, "Hard": 3, "Expert": 4 };
    if (levels[currentDifficultyLabel] > levels[prevLabel]) {
      showLevelChange(currentDifficultyLabel, "up");
    } else if (levels[currentDifficultyLabel] < levels[prevLabel]) {
      showLevelChange(currentDifficultyLabel, "down");
    }
  }
}

function ensureTargetLength(minLength) {
  if (!calibrationComplete) {
    if (targetText.length < getActiveTypingInput().value.length + 5) {
      appendAdaptiveSentences(1);
    }
    return;
  }
  while (targetText.length < minLength) {
    appendAdaptiveSentences(1);
  }
}

function getTypedStats(elapsedSeconds) {
  const activeInput = getActiveTypingInput();
  const typedVal = activeInput ? activeInput.value : "";
  const targetVisible = Math.max(INITIAL_VISIBLE_CHARS, typedVal.length + BUFFER_CHARS);
  ensureTargetLength(targetVisible + 40);

  const typed = typedVal;
  let correctChars = 0;

  for (let i = 0; i < typed.length; i += 1) {
    if (charsMatch(typed[i], targetText[i])) {
      correctChars += 1;
    }
  }

  const safeElapsed = Math.max(elapsedSeconds, 1);
  const apm = Math.round(correctChars / (safeElapsed / 60));
  const attemptedChars = typed.length + mistakeCount;
  const accuracy = attemptedChars === 0 ? 100 : Math.round((correctChars / attemptedChars) * 100);
  const stats = {
    apm,
    accuracy,
    correctChars,
    typedChars: typed.length,
    mistakes: mistakeCount
  };

  return {
    ...stats,
    coins: getCoinScore(stats)
  };
}

function renderPrompt() {
  const promptTextEl = getActivePromptTextEl();
  if (!promptTextEl) return;

  const activeInput = getActiveTypingInput();
  const typed = activeInput ? activeInput.value : "";
  const targetVisible = Math.max(INITIAL_VISIBLE_CHARS, typed.length + BUFFER_CHARS);

  if (calibrationComplete && running && selectedDifficulty === "dynamic") {
    const apm = getRollingApm();
    const weights = getDifficultyWeights(apm);
    let liveLabel = "Basis";
    if (weights.expert > 0.3) liveLabel = "Expert";
    else if (weights.hard > 0.3) liveLabel = "Hard";
    else if (weights.medium > 0.3) liveLabel = "Medium";

    const levels = { "Basis": 1, "Medium": 2, "Hard": 3, "Expert": 4 };
    if (levels[liveLabel] < levels[currentDifficultyLabel]) {
      if (targetText.length > targetVisible + 10) {
        const match = targetText.substring(targetVisible).match(/[.?!]["']?\s/);
        if (match) {
          const breakPoint = targetVisible + match.index + match[0].length - 1;
          targetText = targetText.slice(0, breakPoint);
          targetWords = targetText.split(/\s+/);
          currentDifficultyLabel = liveLabel;
          showLevelChange(currentDifficultyLabel, "down");
        }
      }
    }
  }

  ensureTargetLength(targetVisible + 40);

  const visibleLength = Math.min(targetText.length, targetVisible);
  const visibleText = targetText.slice(0, visibleLength);
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < visibleText.length; i += 1) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = visibleText[i];

    if (i === mistakeIndex) {
      const type = mistakeHistory[i];
      span.classList.add(type === "case" ? "case-error" : "wrong", "current");
    } else if (i < typed.length) {
      if (mistakeHistory[i] === "wrong") {
        span.classList.add("wrong");
      } else if (mistakeHistory[i] === "case") {
        span.classList.add("case-error");
      } else {
        span.classList.add("correct");
      }
    } else if (i === typed.length && canAcceptTyping()) {
      span.classList.add("current");
    }

    fragment.appendChild(span);
  }

  promptTextEl.replaceChildren(fragment);

  // Auto-scroll logic inside text boxes
  const currentEl = promptTextEl.querySelector('.current');
  if (currentEl) {
    const elTop = currentEl.offsetTop;
    const containerTop = promptTextEl.scrollTop;
    const containerHeight = promptTextEl.clientHeight;

    if (elTop > containerTop + containerHeight - 75) {
      promptTextEl.scrollTop = elTop - 50;
    } else if (elTop < containerTop) {
      promptTextEl.scrollTop = elTop - 20;
    }
  }
}

function rejectWrongInput(typedChar) {
  if (testArmed && !running) {
    beginTimer();
  }

  const activeInput = getActiveTypingInput();
  const typedLength = activeInput ? activeInput.value.length : 0;

  mistakeCount += 1;
  mistakeIndex = typedLength;

  const targetChar = targetText[mistakeIndex];
  let mistakeType = "wrong";
  if (typedChar && targetChar && typedChar.toLowerCase() === targetChar.toLowerCase()) {
    mistakeType = "case";
  }

  if (mistakeHistory[mistakeIndex] !== "wrong") {
    mistakeHistory[mistakeIndex] = mistakeType;
  }

  setMistakeCountValue(mistakeCount);
  renderPrompt();
  updateLiveStats();
  playKeySound(false);

  const activeCard = document.querySelector(`.${getTestKey()}-typing-card`);
  if (activeCard) {
    activeCard.classList.remove("input-error");
    void activeCard.offsetWidth;
    activeCard.classList.add("input-error");
  }
}

function isAllowedInput(data) {
  const activeInput = getActiveTypingInput();
  const typedLength = activeInput ? activeInput.value.length : 0;
  ensureTargetLength(typedLength + BUFFER_CHARS);

  if (!data) return false;

  for (let i = 0; i < data.length; i += 1) {
    if (!charsMatch(data[i], targetText[typedLength + i])) {
      return false;
    }
  }
  return true;
}

function setProgress(progress) {
  const clamped = Math.max(0, Math.min(progress, 100));
  const milestone = Math.floor(clamped / 20);

  const fillEl = getActiveUploadFillEl();
  if (fillEl) fillEl.style.width = `${clamped}%`;

  setUploadPercentValue(`${Math.round(clamped)}%`);

  const checks = document.querySelectorAll(`#${getTestKey()}ConsoleWrapper .upload-check, #${getTestKey()}ConsoleWrapper .crack-checkpoint`);
  checks.forEach((check, index) => {
    const isActive = clamped >= (index + 1) * 20;
    if (isActive && !check.classList.contains("active")) {
      pulseElement(check);
      
      // Unlock corresponding dossier section
      if (currentTest === "dossier" && sections[index] && !sections[index].classList.contains("unlocked")) {
        sections[index].classList.remove("locked");
        sections[index].classList.add("unlocked");
      }
    }
    check.classList.toggle("active", isActive);
  });

  // Decryption ring for dossier
  if (currentTest === "dossier" && decryptFill) {
    decryptFill.setAttribute("stroke-dasharray", `${clamped} ${100 - clamped}`);
  }

  if (running && milestone > lastMilestone) {
    lastMilestone = milestone;
    playMilestoneSound();
  }
}

function updateLiveStats() {
  let currentElapsedMs = Date.now() - startedAt - totalPausedTime;
  if (paused) currentElapsedMs -= (Date.now() - pauseStartTime);
  const elapsed = running ? currentElapsedMs / 1000 : finalElapsed;
  const stats = getTypedStats(elapsed);
  
  const wpmDisplay = elapsed < 5 && running ? "—" : stats.apm;
  setLiveWpmValue(wpmDisplay);
  setAccuracyValue(`${stats.accuracy}%`);
  setMistakeCountValue(mistakeCount);

  if (currentTest === "leaderboard") {
    updateLivePosition(stats.apm, stats.accuracy, elapsed);
  }
}

function getLiveLeaderboardPosition(currentApm, currentAccuracy) {
  const scores = initLeaderboard();
  const placeholder = { name: "Jij", apm: currentApm, accuracy: currentAccuracy };
  const tempScores = [...scores, placeholder];
  tempScores.sort((a, b) => {
    const aApm = a.apm !== undefined ? a.apm : 0;
    const bApm = b.apm !== undefined ? b.apm : 0;
    const aAcc = a.accuracy !== undefined ? a.accuracy : 0;
    const bAcc = b.accuracy !== undefined ? b.accuracy : 0;
    if (bApm !== aApm) return bApm - aApm;
    return bAcc - aAcc;
  });
  const idx = tempScores.findIndex(e => e === placeholder);
  return idx + 1;
}

function updateLivePosition(currentApm, currentAccuracy, elapsed) {
  if (elapsed < 5 && running) {
    if (currentPositionEl) currentPositionEl.textContent = "—";
    if (positionArrowEl) {
      positionArrowEl.textContent = "";
      positionArrowEl.className = "position-arrow neutral";
    }
    previousPosition = null;
    return;
  }

  const currentPos = getLiveLeaderboardPosition(currentApm, currentAccuracy);
  if (currentPositionEl) currentPositionEl.textContent = `${currentPos}e`;

  if (positionArrowEl) {
    if (previousPosition !== null) {
      if (currentPos < previousPosition) {
        positionArrowEl.textContent = "▲";
        positionArrowEl.className = "position-arrow up";
      } else if (currentPos > previousPosition) {
        positionArrowEl.textContent = "▼";
        positionArrowEl.className = "position-arrow down";
      }
    } else {
      positionArrowEl.textContent = "";
      positionArrowEl.className = "position-arrow neutral";
    }
  }

  previousPosition = currentPos;
}

function updateTimer() {
  if (!running || paused) return;

  const elapsed = (Date.now() - startedAt - totalPausedTime) / 1000;
  const remaining = Math.max(0, TOTAL_SECONDS - elapsed);
  const progress = (elapsed / TOTAL_SECONDS) * 100;

  setTimerValue(Math.ceil(remaining));
  setProgress(progress);
  updateLiveStats();

  if (remaining <= 10 && remaining > 0) {
    if (!missionStatusTimer) {
      setMissionStatusText("Laatste seconden");
    }
  }

  if (remaining <= 0) {
    completeTimedTest();
  }
}

function resetTest() {
  running = false;
  testArmed = false;
  testReadyToFinish = false;
  testFinished = false;
  clearInterval(typewriterId);

  if (briefingVideo) {
    briefingVideo.pause();
    clearVideoGlitch(briefingVideo.closest(".briefing-avatar-hud"));
    const briefingHud = briefingVideo.closest(".briefing-avatar-hud");
    if (briefingHud) briefingHud.classList.remove("video-active", "video-playing", "video-paused");
  }
  if (endBriefingVideo) {
    endBriefingVideo.pause();
    clearVideoGlitch(endBriefingVideo.closest(".briefing-avatar-hud"));
    const endBriefingHud = endBriefingVideo.closest(".briefing-avatar-hud");
    if (endBriefingHud) endBriefingHud.classList.remove("video-active", "video-playing", "video-paused");
  }

  const tooltip = document.getElementById("chart-tooltip");
  if (tooltip) tooltip.classList.remove("visible");

  paused = false;
  pauseStartTime = 0;
  totalPausedTime = 0;
  if (playBriefingButton) {
    playBriefingButton.innerHTML = '<span aria-hidden="true">&#9658;</span> Start briefing';
    playBriefingButton.disabled = false;
  }
  clearInterval(timerId);

  TOTAL_SECONDS = TOTAL_SECONDS_MAP[currentTest];
  finalElapsed = TOTAL_SECONDS;
  resultStats = null;
  activePlaceholderEntry = null;
  targetWords = [];
  wordCursor = 0;
  targetText = "";
  lastMilestone = 0;
  mistakeIndex = -1;
  mistakeCount = 0;
  mistakeHistory = {};
  currentDifficultyLabel = "Basis";
  calibrationComplete = (selectedDifficulty !== "dynamic");

  const couponEl = document.querySelector("#couponCode");
  if (couponEl) {
    couponEl.textContent = "ONTCIJFER CODE";
    couponEl.className = "coupon-code locked";
    couponEl.setAttribute("title", "Klik om de code te ontcijferen");
    couponEl.style.background = "";
    couponEl.style.color = "";
    couponEl.style.borderColor = "";
    couponEl.style.width = "";
  }

  // Reset vault-specific graphics
  if (vaultHandle) vaultHandle.classList.remove("turned");
  if (vaultDoor) vaultDoor.classList.remove("cracked");
  if (vaultDial) {
    dialRotation = 0;
    vaultDial.style.transform = "";
  }
  const dialLockIcon = document.querySelector(".dial-center svg");
  if (dialLockIcon) {
    dialLockIcon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
  }

  // Reset dossier-specific graphics
  if (docStamp) {
    docStamp.classList.remove("unlocked");
    docStamp.textContent = "TOP SECRET";
  }
  if (posterContainer) {
    posterContainer.className = "poster-container";
  }
  sections.forEach(s => {
    if (s) {
      s.className = "redact-strip locked";
    }
  });

  rollingWindow.length = 0;

  // Clear inputs
  const allInputs = document.querySelectorAll(".typingInput");
  allInputs.forEach(input => {
    input.value = "";
    input.disabled = true;
  });

  updateOverlay();

  setTimerValue(TOTAL_SECONDS);
  setLiveWpmValue("0");
  setMistakeCountValue("0");
  setAccuracyValue("100%");
  setProgress(0);

  previousPosition = null;
  if (currentPositionEl) currentPositionEl.textContent = "—";
  if (positionArrowEl) {
    positionArrowEl.textContent = "";
    positionArrowEl.className = "position-arrow neutral";
  }

  // Initialize and Scramble active prompt text
  const initialText = buildInitialText();
  targetWords = initialText.split(/\s+/);
  targetText = targetWords.join(" ");
  renderPrompt();

  startButton.hidden = false;
  startButton.disabled = false;
  startButton.innerHTML = onboardingComplete
    ? '<span aria-hidden="true">&#9658;</span> Start de test'
    : '<span aria-hidden="true">&#9658;</span> Bekijk briefing';
  finishButton.hidden = true;
  finishButton.disabled = true;

  if (activeMissionView !== resultPanel) {
    resultPanel.hidden = true;
    resultPanel.classList.remove("active");
  }

  if (ctaFeedback) ctaFeedback.textContent = "";

  setMissionStep(onboardingComplete ? "ready" : "briefing");
  
  let instructions = "Briefing voltooid. Klik op start en begin wanneer je klaar bent. De timer loopt pas vanaf je eerste letter.";
  if (!onboardingComplete) {
    instructions = "Miss J opent zo de briefing. Na haar instructie wordt de typetest vrijgegeven.";
  }
  
  if (currentTest === "kluis") {
    setMissionCopy(onboardingComplete ? "Wacht op start" : "Briefing nodig", instructions);
    setCodeStatusText("vergrendeld");
  } else if (currentTest === "dossier") {
    setMissionCopy(onboardingComplete ? "STANDBY" : "BRIEFING", instructions);
    setCodeStatusText("gesloten");
  } else {
    // Normal test
    const missionMsg = document.querySelector("#missionMessage");
    if (missionMsg) {
      missionMsg.textContent = instructions;
    }
  }

  // Disable dropdowns if not dynamic
  difficultyDropdowns.forEach(dd => {
    dd.classList.toggle("disabled", !onboardingComplete);
  });

  if (currentTest === "leaderboard") {
    if (typeof resetLeaderboardCollapseStates === "function") resetLeaderboardCollapseStates();
    renderLeaderboard();
  }
}

function startTest() {
  if (!onboardingComplete) {
    guideToBriefing();
    return;
  }

  createAudioContext();
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }

  resetTest();
  testArmed = true;
  finalElapsed = TOTAL_SECONDS;

  const activeInput = getActiveTypingInput();
  if (activeInput) activeInput.disabled = false;

  updateOverlay();

  if (currentTest === "kluis") {
    setCodeStatusText("ontgrendeld");
  } else if (currentTest === "dossier") {
    setCodeStatusText("klaar");
  }

  startButton.disabled = true;
  startButton.innerHTML = '<span aria-hidden="true">&#9201;</span> Klaar voor de start';
  setMissionStep("typing");
  
  setMissionCopy(
    "Klaar voor de start",
    `De timer blijft op ${TOTAL_SECONDS} seconden staan tot je eerste letter is getypt.`
  );

  playStartSound();
  renderPrompt();

  const codePanel = document.querySelector(`#${getTestKey()}CodePanel`);
  if (codePanel) {
    codePanel.animate([
      { transform: "translateY(12px)" },
      { transform: "translateY(0)" }
    ], {
      duration: 350,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    });
  }

  if (activeInput) activeInput.focus();
}

function beginTimer() {
  if (running || !testArmed || testReadyToFinish) return;

  running = true;
  testArmed = false;
  startedAt = Date.now();
  finalElapsed = 0;
  startButton.innerHTML = '<span aria-hidden="true">&#9632;</span> Missie loopt';

  difficultyDropdowns.forEach(dd => dd.classList.add("disabled"));

  setMissionStatusText("Missie loopt");

  timerId = window.setInterval(updateTimer, 100);
  updateTimer();
}

function completeTimedTest() {
  if (!running) return;

  running = false;
  testArmed = false;
  clearInterval(timerId);
  finalElapsed = TOTAL_SECONDS;
  setTimerValue("0");
  setProgress(100);
  updateLiveStats();

  const activeInput = getActiveTypingInput();
  if (activeInput) activeInput.disabled = true;
  testFinished = true;

  updateOverlay();

  resultStats = getTypedStats(TOTAL_SECONDS);
  startButton.hidden = true;
  startButton.disabled = true;
  setMissionStep("typing");

  if (currentTest === "normal" || currentTest === "leaderboard") {
    testReadyToFinish = true;
    finishButton.hidden = false;
    finishButton.disabled = false;
    playFinishSound();
    setMissionCopy(
      "Missie voltooid",
      "Klik op 'Bekijk uitslag' om je resultaat te zien."
    );
  } 
  else if (currentTest === "kluis") {
    setCodeStatusText("kraken...");

    // Dial spins
    if (vaultDial) {
      const targetRotation = Math.ceil(dialRotation / 90) * 90 + 720;
      const currentRotation = dialRotation;
      dialRotation = targetRotation;

      vaultDial.animate([
        { transform: `rotate(${currentRotation}deg)` },
        { transform: `rotate(${targetRotation}deg)` }
      ], {
        duration: 1200,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards"
      });
      setTimeout(() => {
        vaultDial.style.transform = `rotate(${targetRotation}deg)`;
      }, 1200);
    }

    // Handle turns down & vault cracked (1200ms)
    setTimeout(() => {
      if (vaultHandle) vaultHandle.classList.add("turned");
      if (vaultDoor) vaultDoor.classList.add("cracked");
      setCodeStatusText("gekraakt!");
      playTone(600, 0.1, 0, "triangle", 0.025);
      playFinishSound();

      const dialLockIcon = document.querySelector(".dial-center svg");
      if (dialLockIcon) {
        dialLockIcon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>';
        dialLockIcon.animate([
          { transform: "scale(0.8)" },
          { transform: "scale(1)" }
        ], {
          duration: 400,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
        });
      }
    }, 1200);

    // Show finish button (2600ms)
    setTimeout(() => {
      testReadyToFinish = true;
      finishButton.hidden = false;
      finishButton.disabled = false;
      setMissionCopy(
        "Missie voltooid",
        "De kluis is gekraakt! Klik op 'Bekijk uitslag' om je resultaat te zien."
      );
    }, 2600);
  } 
  else if (currentTest === "dossier") {
    setCodeStatusText("ontcijferen...");

    // Decrypt sections animations
    sections.forEach((s, i) => {
      if (s) {
        setTimeout(() => {
          s.classList.remove("locked");
          s.classList.add("unlocked");
          playTone(400 + i * 80, 0.06, 0, "triangle", 0.02);
        }, i * 200);
      }
    });

    // Stamp unlocks & poster unblur (1200ms)
    setTimeout(() => {
      if (docStamp) {
        docStamp.classList.add("unlocked");
        docStamp.textContent = "UNLOCKED";
      }
      if (posterContainer) {
        posterContainer.classList.add("needs-reveal");
      }
      setCodeStatusText("ontcijferd!");
      playTone(600, 0.1, 0, "triangle", 0.025);
      playFinishSound();
    }, 1200);

    // Show finish button (2600ms)
    setTimeout(() => {
      testReadyToFinish = true;
      finishButton.hidden = false;
      finishButton.disabled = false;
      setMissionCopy(
        "Missie voltooid",
        "Het dossier is ontcijferd! Klik op 'Bekijk uitslag' om je resultaat te zien."
      );
    }, 2600);
  }
}

let endBriefingPlaying = false;
let currentEndStorySlideIndex = -1;

function showResults() {
  if (!testReadyToFinish || activeMissionView === resultPanel || activeMissionView === endBriefingStage) return;
  startEndBriefing();
  transitionToView(endBriefingStage);
}

function startEndBriefing() {
  if (endBriefingPlaying) return;

  createAudioContext();
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }

  endBriefingPlaying = true;

  clearInterval(typewriterId);
  endBriefingText.textContent = "Verbinding maken...";
  currentEndStorySlideIndex = -1;

  if (endBriefingVideo) {
    const endBriefingHud = endBriefingVideo.closest(".briefing-avatar-hud");
    if (endBriefingHud) endBriefingHud.classList.add("video-active");
    endBriefingVideo.currentTime = 0;
    endBriefingVideo.muted = !soundEnabled;
    endBriefingVideo.volume = 1.0;
    triggerVideoGlitch(endBriefingVideo.closest(".briefing-avatar-hud"), () => {
      if (endBriefingPlaying) {
        endBriefingVideo.play().catch(err => console.warn("End video play failed:", err));
        updateEndSubtitles(0);
      }
    });
  } else {
    updateEndSubtitles(0);
  }
}

function updateEndSubtitles(currentTime) {
  let index = 0;
  if (currentTime < 3) index = 0;
  else if (currentTime < 6) index = 1;
  else if (currentTime < 11) index = 2;
  else if (currentTime < 14) index = 3;
  else if (currentTime < 18) index = 4;
  else if (currentTime < 26) index = 5;
  else index = 6;

  if (index !== currentEndStorySlideIndex) {
    currentEndStorySlideIndex = index;
    playEndBriefingSlide(index);
  }
}

function playEndBriefingSlide(index = 0) {
  const dots = document.querySelectorAll("#endBriefingProgress span");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx <= index);
  });

  clearInterval(typewriterId);
  endBriefingText.textContent = "";
  let textIndex = 0;
  const slideText = endStorySlides[index];
  typewriterId = window.setInterval(() => {
    endBriefingText.textContent += slideText[textIndex];
    textIndex += 1;
    if (textIndex >= slideText.length) {
      clearInterval(typewriterId);
    }
  }, 16);

  playTone(360 + index * 80, 0.07, 0, "triangle", 0.018);
}

function completeEndBriefing() {
  if (endBriefingVideo) {
    endBriefingVideo.pause();
    clearVideoGlitch(endBriefingVideo.closest(".briefing-avatar-hud"));
  }
  endBriefingPlaying = false;
  revealResults();
}

function revealResults() {
  if (activeMissionView === resultPanel) return;

  const stats = resultStats || getTypedStats(finalElapsed);
  let resultIntro = "Wow, goed gedaan zeg! Ik zie dat jij het absoluut in je hebt om een superspion te worden. Met de TypeMission-cursus leren wij je hoe je razendsnel en volledig blind met 10 vingers leert typen!";
  if (stats.apm >= 120) {
    if (stats.accuracy >= 90) {
      resultIntro = "Wow, je bent al net zo goed als een superspion! Je typkunsten zijn al fantastisch, deze missie was een eitje voor jou.";
    } else {
      resultIntro = "Wow, je typt razendsnel! Maar een echte superspion werkt ook heel secuur. De TypeMission-cursus kan je leren om met 10 vingers blind en nagenoeg foutloos te typen.";
    }
  }

  const spyFactEl = document.querySelector("#spyFact");
  if (spyFactEl) {
    if (stats.apm >= 100 && stats.accuracy < 90) {
      spyFactEl.innerHTML = "<strong>Wist je dat:</strong> Geslaagde Super Spionnen typen met wel meer dan 120 aanslagen per minuut, sommigen zelfs wel meer dan 170! Echte spionnen maken bovendien bijna geen fouten en typen volledig blind met 10 vingers. Onze cursus helpt jou om met 10 vingers foutloos te typen!";
    } else if (stats.apm >= 120) {
      spyFactEl.innerHTML = "<strong>Wist je dat:</strong> Geslaagde Super Spionnen typen met wel meer dan 120 aanslagen per minuut, sommigen zelfs wel meer dan 170! Het wereldrecord blindtypen staat op een ongelofelijke snelheid van wel 800+ APM!";
    } else {
      spyFactEl.innerHTML = "<strong>Wist je dat:</strong> Geslaagde Super Spionnen typen met wel meer dan 120 aanslagen per minuut, sommigen zelfs wel meer dan 170! Wil jij dat ook leren? Doe dan onze typecursus en word razendsnel.";
    }
  }

  // Adjust results title based on test theme
  let targetTitle = "Kluis gekraakt, superspion!";
  if (currentTest === "dossier") {
    targetTitle = stats.apm >= 120 ? "Dossier ontcijferd, superspion!" : (stats.coins >= 260 ? "Dossier ontcijferd, rekruut!" : "Missie voltooid, rekruut");
  } else if (currentTest === "normal" || currentTest === "leaderboard") {
    targetTitle = stats.apm >= 120 ? "Missie geslaagd, superspion!" : (stats.coins >= 260 ? "Missie geslaagd, rekruut" : "Missie voltooid, rekruut");
  } else {
    targetTitle = stats.apm >= 120 ? "Kluis gekraakt, superspion!" : (stats.coins >= 260 ? "Kluis gekraakt, rekruut!" : "Missie voltooid, rekruut");
  }

  resultTitle.textContent = targetTitle;
  resultText.textContent = resultIntro;

  // Set coupon retry text
  const retryDescEl = document.querySelector("#retryActionDesc");
  if (retryDescEl) {
    if (currentTest === "kluis") {
      retryDescEl.textContent = "Kraak de kluis opnieuw en verbeter je APM record!";
    } else if (currentTest === "dossier") {
      retryDescEl.textContent = "Ontcijfer het dossier opnieuw en verbeter je APM record!";
    } else {
      retryDescEl.textContent = "Speel de typetest opnieuw en verbeter je APM record!";
    }
  }

  startButton.disabled = false;
  startButton.innerHTML = '<span aria-hidden="true">&#9658;</span> Nog een poging';
  setMissionStep("result");
  setMissionCopy(
    "Missie voltooid",
    `Je haalde ${stats.apm} APM en ${stats.coins} Super Spy School coins.`
  );
  testReadyToFinish = false;
  showInlineComplete(stats);

  if (currentTest === "leaderboard") {
    if (typeof resetLeaderboardCollapseStates === "function") resetLeaderboardCollapseStates();

    const savedName = getCookie("tm_spy_name");
    if (savedName) {
      const scores = initLeaderboard();
      const newEntry = { name: savedName, apm: stats.apm, accuracy: stats.accuracy, isDefault: false, timestamp: Date.now() };
      scores.push(newEntry);
      scores.sort((a, b) => {
        if (b.apm !== a.apm) return b.apm - a.apm;
        return b.accuracy - a.accuracy;
      });
      saveLeaderboard(scores);
      lastSavedScoreEntry = newEntry;

      syncSpyNameUI();

      const highlightIdx = scores.findIndex(e => e.name === savedName && e.apm === stats.apm && e.accuracy === stats.accuracy);
      renderLeaderboard(highlightIdx);
    } else {
      syncSpyNameUI();

      const placeholderEntry = { name: "Jij", apm: stats.apm, accuracy: stats.accuracy, isPlaceholder: true };
      renderLeaderboard(-1, placeholderEntry);
    }
  }

  transitionToView(resultPanel, () => {
    const agentCard = document.querySelector(".agent-profile-badge");
    if (agentCard) {
      agentCard.animate([
        { transform: "scale(0.94)", opacity: 0.72 },
        { transform: "scale(1)", opacity: 1 }
      ], {
        duration: 480,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      });
    }

    const coinImg = document.querySelector(".reward-coin-icon");
    if (coinImg) {
      coinImg.animate([
        { transform: "rotateY(0deg)" },
        { transform: "rotateY(720deg)" }
      ], {
        duration: 1500,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      });
    }

    animateValue(completeCoins, 0, stats.coins, 1200);
    animateValue(completeWpm, 0, stats.apm, 1200);
    animateValue(completeAccuracy, 0, stats.accuracy, 1200, "%");
    animateValue(completeMistakes, 0, stats.mistakes, 1200);

    renderResultCharts(stats.apm, stats.accuracy);

    if (currentTest === "leaderboard") {
      // Confetti burst!
      if (typeof confetti === "function") {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 }
          });
        }, 250);
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 }
          });
        }, 400);
      }

      // GSAP Animations
      if (window.gsap) {
        // Grow the podium pedestals
        gsap.from("#leaderboardSectionResult .podium-pedestal", {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1.5,
          ease: "elastic.out(1, 0.55)",
          stagger: 0.2
        });

        // Drop the rank badges / trophies from above
        gsap.from("#leaderboardSectionResult .podium-column .trophy-wrapper", {
          scale: 0,
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "back.out(2)",
          delay: 0.5,
          stagger: 0.2
        });

        // Fade in names and scores
        gsap.from("#leaderboardSectionResult .podium-column .spy-name, #leaderboardSectionResult .podium-column .spy-score", {
          opacity: 0,
          y: 15,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.7,
          stagger: 0.1
        });

        // Slide in leaderboard capsule rows
        gsap.from("#leaderboardSectionResult .leaderboard-row", {
          opacity: 0,
          x: -30,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.0
        });
      }
    }

    missionStage.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center"
    });
  });
}

function getRank(stats) {
  if (stats.coins >= 430 && stats.accuracy >= 90) return "Superspion";
  if (stats.coins >= 260) return "Codekraker";
  return "Rekruut";
}

function showInlineComplete(stats) {
  const rank = getRank(stats);
  rankBadge.textContent = rank;

  completeWpm.textContent = "0";
  completeAccuracy.textContent = "0%";
  completeMistakes.textContent = "0";
  completeCoins.textContent = "0";

  playCelebrationSound();
}

// ═══════════════════════════════════════════════════════════════════
// ANIMATIONS & SCENE TRANSITIONS
// ═══════════════════════════════════════════════════════════════════

function runIntroAnimations() {
  const header = document.querySelector(".site-header");
  if (header) {
    header.style.opacity = "0";
    header.style.transform = "translateY(-24px)";
    header.style.transition = "opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    requestAnimationFrame(() => {
      header.style.opacity = "1";
      header.style.transform = "translateY(0)";
    });
  }

  const heroElements = document.querySelectorAll(".hero-copy > *");
  heroElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";
    el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.09}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.09}s`;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed-active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
      if (el.classList.contains("hero-copy")) return;
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed-active"));
  }
}

function pulseElement(element) {
  if (!element) return;
  const hasCentering = element.classList.contains("crack-checkpoint") || element.classList.contains("upload-check");
  const transformStart = hasCentering ? "translate(-50%, -50%) scale(0.94)" : "scale(0.94)";
  const transformEnd = hasCentering ? "translate(-50%, -50%) scale(1)" : "scale(1)";

  element.animate([
    { transform: transformStart },
    { transform: transformEnd }
  ], {
    duration: 350,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  });
}

function clearAnimatedStyles(element) {
  if (!element) return;
  element.removeAttribute("style");
}

function setViewImmediate(nextView) {
  [storyStage, missionLayout, endBriefingStage, resultPanel].forEach((view) => {
    const isActive = view === nextView;
    view.hidden = !isActive;
    view.classList.toggle("active", isActive);
    clearAnimatedStyles(view);
  });
  missionStage.style.height = "";
  activeMissionView = nextView;
}

function transitionToView(nextView, onComplete) {
  if (viewTransitioning) {
    window.setTimeout(() => transitionToView(nextView, onComplete), 90);
    return;
  }

  const currentView = activeMissionView;
  if (currentView === nextView) {
    if (onComplete) onComplete();
    return;
  }

  if (prefersReducedMotion) {
    setViewImmediate(nextView);
    if (onComplete) onComplete();
    return;
  }

  const currentHeight = currentView.offsetHeight;
  viewTransitioning = true;
  missionStage.classList.add("is-transitioning");

  missionStage.style.height = `${currentHeight}px`;
  missionStage.style.overflow = "hidden";

  nextView.style.position = "absolute";
  nextView.style.width = "100%";
  nextView.style.height = "auto";
  nextView.style.visibility = "hidden";
  nextView.hidden = false;
  nextView.classList.add("active");

  const nextHeight = nextView.offsetHeight;

  nextView.style.inset = "";
  nextView.style.height = "";
  nextView.style.visibility = "";
  nextView.style.opacity = "0";

  currentView.style.position = "absolute";
  currentView.style.top = "0";
  currentView.style.left = "0";
  currentView.style.width = "100%";

  nextView.style.position = "absolute";
  nextView.style.top = "0";
  nextView.style.left = "0";
  nextView.style.width = "100%";

  const easingCurve = "cubic-bezier(0.16, 1, 0.3, 1)";

  morphFlash.style.transform = "translateX(-108%) skewX(-14deg)";
  morphFlash.style.opacity = "0";

  const flashAnim = morphFlash.animate([
    { transform: "translateX(-108%) skewX(-14deg)", opacity: 0 },
    { transform: "translateX(0%) skewX(-14deg)", opacity: 0.6, offset: 0.5 },
    { transform: "translateX(108%) skewX(-14deg)", opacity: 0 }
  ], {
    duration: 600,
    easing: easingCurve
  });

  const fadeOutAnim = currentView.animate([
    { opacity: 1, transform: "translateY(0) scale(1)" },
    { opacity: 0, transform: "translateY(-30px) scale(0.95)" }
  ], {
    duration: 450,
    easing: easingCurve
  });

  const heightAnim = missionStage.animate([
    { height: `${currentHeight}px` },
    { height: `${nextHeight}px` }
  ], {
    duration: 600,
    easing: easingCurve
  });

  const fadeInAnim = nextView.animate([
    { opacity: 0, transform: "translateY(30px) scale(0.95)" },
    { opacity: 1, transform: "translateY(0) scale(1)" }
  ], {
    duration: 550,
    delay: 50,
    easing: easingCurve,
    fill: "forwards"
  });

  // Stagger next view components
  if (nextView === missionLayout) {
    const activeConsole = document.querySelector(`#${getTestKey()}ConsoleWrapper`);
    if (activeConsole) {
      activeConsole.animate([
        { opacity: 0, transform: "translateY(30px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], {
        duration: 600,
        delay: 100,
        easing: easingCurve,
        fill: "both"
      });
    }
  } else if (nextView === resultPanel) {
    const headerRow = nextView.querySelector(".result-header-row");
    const statsRow = nextView.querySelector(".complete-stats");
    const chartsRow = nextView.querySelector(".result-charts-row");
    const potentialCard = nextView.querySelector(".potential-card");
    const actionsRow = nextView.querySelector(".result-actions-row");
    const gamesFooter = nextView.querySelector(".vault-games-footer");

    const items = [headerRow, statsRow, chartsRow, potentialCard, actionsRow, gamesFooter].filter(Boolean);
    items.forEach((item, index) => {
      item.animate([
        { opacity: 0, transform: "translateY(24px) scale(0.99)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], {
        duration: 550,
        delay: 80 + index * 70,
        easing: easingCurve,
        fill: "both"
      });
    });
  } else if (nextView === storyStage || nextView === endBriefingStage) {
    const visual = nextView.querySelector(".briefing-visual");
    const content = nextView.querySelector(".briefing-content");
    const gamesFooter = nextView.querySelector(".vault-games-footer");
    if (visual) {
      visual.animate([
        { opacity: 0, transform: "translateX(-30px) scale(0.97)" },
        { opacity: 1, transform: "translateX(0) scale(1)" }
      ], {
        duration: 600,
        delay: 100,
        easing: easingCurve,
        fill: "both"
      });
    }
    if (content) {
      content.animate([
        { opacity: 0, transform: "translateX(30px) scale(0.97)" },
        { opacity: 1, transform: "translateX(0) scale(1)" }
      ], {
        duration: 600,
        delay: 180,
        easing: easingCurve,
        fill: "both"
      });
    }
    if (gamesFooter) {
      gamesFooter.animate([
        { opacity: 0, transform: "translateY(24px) scale(0.99)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], {
        duration: 550,
        delay: 250,
        easing: easingCurve,
        fill: "both"
      });
    }
  }

  let completed = 0;
  let transitionTimeout = null;

  function forceComplete() {
    if (!viewTransitioning) return;
    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
      transitionTimeout = null;
    }

    currentView.hidden = true;
    currentView.classList.remove("active");

    clearAnimatedStyles(currentView);
    clearAnimatedStyles(nextView);
    clearAnimatedStyles(morphFlash);
    clearAnimatedStyles(missionStage);
    missionStage.classList.remove("is-transitioning");

    // Clear child styles
    const childSelectors = [
      ".briefing-panel", ".vault-console", ".dossier-console",
      ".result-header-row", ".complete-stats",
      ".result-charts-row", ".potential-card", ".result-actions-row",
      ".briefing-visual", ".briefing-content", ".vault-games-footer"
    ];
    childSelectors.forEach(selector => {
      const el = nextView.querySelector(selector) || currentView.querySelector(selector);
      if (el) clearAnimatedStyles(el);
    });

    activeMissionView = nextView;
    viewTransitioning = false;
    if (onComplete) onComplete();
  }

  function checkDone() {
    completed++;
    if (completed === 4) forceComplete();
  }

  flashAnim.onfinish = checkDone;
  fadeOutAnim.onfinish = checkDone;
  heightAnim.onfinish = () => {
    missionStage.style.height = `${nextHeight}px`;
    checkDone();
  };
  fadeInAnim.onfinish = checkDone;

  transitionTimeout = window.setTimeout(() => {
    console.warn("View transition timed out. Forcing completion.");
    forceComplete();
  }, 950);
}

// ═══════════════════════════════════════════════════════════════════
// TEXT TYPING EFFECTS
// ═══════════════════════════════════════════════════════════════════

function typeStoryText(text) {
  clearInterval(typewriterId);
  storyText.textContent = "";

  let index = 0;
  typewriterId = window.setInterval(() => {
    storyText.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      clearInterval(typewriterId);
    }
  }, 16);
}

function setStoryProgress(activeIndex) {
  storyProgress.forEach((dot, index) => {
    dot.classList.toggle("active", index <= activeIndex);
  });
}

let currentStorySlideIndex = -1;

function updateSubtitles(currentTime) {
  let index = 0;
  if (currentTime < 2) index = 0;
  else if (currentTime < 8) index = 1;
  else if (currentTime < 14) index = 2;
  else if (currentTime < 18) index = 3;
  else if (currentTime < 23) index = 4;
  else index = 5;

  if (index !== currentStorySlideIndex) {
    currentStorySlideIndex = index;
    playBriefingSlide(index);
  }
}

function playBriefingSlide(index = 0) {
  const isFinalSlide = index >= storySlides.length - 1;

  setStoryProgress(index);
  typeStoryText(storySlides[index]);
  playTone(360 + index * 80, 0.07, 0, "triangle", 0.018);

  if (isFinalSlide) {
    playBriefingButton.textContent = "Briefing voltooid";
    beginMissionButton.innerHTML = '<span aria-hidden="true">&#9658;</span> Begin de test';
    beginMissionButton.classList.replace("secondary-story-button", "primary-button");

    beginMissionButton.animate([
      { transform: "scale(0.9)", opacity: 0.5 },
      { transform: "scale(1)", opacity: 1 }
    ], {
      duration: 500,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    });
    beginMissionButton.disabled = false;
    unlockNote.textContent = "Missie vrijgegeven. Klik op Begin de test om de typetest klaar te zetten.";
    beginMissionButton.focus();
    playMilestoneSound();
  }
}

function startBriefing() {
  if (briefingPlaying) return;

  createAudioContext();
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }

  briefingPlaying = true;
  if (startLiveBadge) {
    startLiveBadge.textContent = "Miss J live";
    startLiveBadge.classList.remove("calling");
  }
  beginMissionButton.disabled = false;
  beginMissionButton.textContent = "Sla briefing over";
  // Button text/state managed by video play event listener
  playStartSound();
  clearTimeout(storyTimeoutId);

  clearInterval(typewriterId);
  storyText.textContent = "Verbinding maken...";
  currentStorySlideIndex = -1;

  if (briefingVideo) {
    const briefingHud = briefingVideo.closest(".briefing-avatar-hud");
    if (briefingHud) briefingHud.classList.add("video-active");
    briefingVideo.currentTime = 0;
    briefingVideo.muted = !soundEnabled;
    briefingVideo.volume = 1.0;
    triggerVideoGlitch(briefingVideo.closest(".briefing-avatar-hud"), () => {
      if (briefingPlaying) {
        briefingVideo.play().catch(err => console.warn("Video play failed:", err));
        updateSubtitles(0);
      }
    });
  } else {
    updateSubtitles(0);
  }
}

function completeOnboarding({ startImmediately = false } = {}) {
  clearTimeout(storyTimeoutId);
  clearInterval(typewriterId);

  if (briefingVideo) {
    briefingVideo.pause();
    clearVideoGlitch(briefingVideo.closest(".briefing-avatar-hud"));
    const briefingHud = briefingVideo.closest(".briefing-avatar-hud");
    if (briefingHud) briefingHud.classList.remove("video-active", "video-playing", "video-paused");
  }

  onboardingComplete = true;
  briefingPlaying = false;
  beginMissionButton.disabled = false;
  beginMissionButton.innerHTML = '<span aria-hidden="true">&#9658;</span> Begin de test';
  beginMissionButton.classList.replace("secondary-story-button", "primary-button");
  playBriefingButton.disabled = false;
  storyStage.classList.add("complete");
  unlockNote.textContent = "Briefing voltooid. De typetest is ontgrendeld.";
  
  resetTest();

  missionStage.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "center"
  });

  transitionToView(missionLayout, () => {
    if (startImmediately) {
      window.setTimeout(startTest, 120);
    }
  });
}

function guideToBriefing() {
  storyStage.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "center"
  });

  storyStage.animate([
    { transform: "scale(0.985)" },
    { transform: "scale(1)" }
  ], {
    duration: 350,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  });
}

let missionStatusTimer = null;
function typewriteMissionStatus(text) {
  clearTimeout(missionStatusTimer);
  missionStatusTimer = null;
  setMissionStatusText("");
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      missionStatusEls.forEach(el => el.textContent += text[i]);
      i++;
      missionStatusTimer = setTimeout(typeChar, 25);
    } else {
      missionStatusTimer = null;
    }
  }
  typeChar();
}

function setMissionCopy(status, message) {
  typewriteMissionStatus(status);
  const normalMsg = document.querySelector("#missionMessage");
  if (normalMsg) normalMsg.textContent = message;
}

let levelDisplayTimeout = null;
function showLevelChange(label, direction) {
  let msg = "Niveau " + label;
  typewriteMissionStatus(msg);

  clearTimeout(levelDisplayTimeout);
  levelDisplayTimeout = setTimeout(() => {
    const elapsed = (Date.now() - startedAt - totalPausedTime) / 1000;
    const remaining = Math.max(0, TOTAL_SECONDS - elapsed);
    if (remaining <= 10 && running) {
      typewriteMissionStatus("Laatste seconden");
    } else if (running) {
      typewriteMissionStatus("Missie loopt");
    } else {
      typewriteMissionStatus(onboardingComplete ? "Wacht op start" : "Briefing nodig");
    }
  }, 2500);
}

// ═══════════════════════════════════════════════════════════════════
// AUDIO SYNTHESIS SYSTEM
// ═══════════════════════════════════════════════════════════════════

function createAudioContext() {
  if (!soundEnabled || audioContext) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) audioContext = new AudioContext();
}

function playTone(frequency, duration = 0.06, delay = 0, type = "sine", volume = 0.032) {
  if (!soundEnabled || !audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime + delay;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function playStartSound() {
  playTone(320, 0.07, 0, "triangle");
  playTone(520, 0.08, 0.08, "triangle");
  playTone(720, 0.08, 0.17, "triangle");
}

function playKeySound(isCorrect) {
  const now = performance.now();
  if (now - lastTickSound < 55) return;
  lastTickSound = now;
  playTone(isCorrect ? 820 : 190, 0.035, 0, isCorrect ? "square" : "sawtooth", isCorrect ? 0.018 : 0.012);
}

function playMilestoneSound() {
  playTone(520, 0.06, 0, "triangle", 0.02);
  playTone(700, 0.07, 0.06, "triangle", 0.02);
}

function playFinishSound() {
  playTone(420, 0.08, 0, "triangle");
  playTone(560, 0.08, 0.09, "triangle");
  playTone(760, 0.11, 0.18, "triangle");
}

function playCelebrationSound() {
  playTone(520, 0.08, 0, "triangle", 0.026);
  playTone(660, 0.08, 0.08, "triangle", 0.026);
  playTone(820, 0.13, 0.16, "triangle", 0.03);
  playTone(980, 0.16, 0.3, "triangle", 0.025);
}

function playGlitchSound() {
  if (!soundEnabled || !audioContext) return;
  for (let i = 0; i < 6; i++) {
    const freq = 150 + Math.random() * 850;
    const duration = 0.02 + Math.random() * 0.04;
    const delay = i * 0.06;
    const type = Math.random() > 0.5 ? "square" : "sawtooth";
    const volume = 0.005 + Math.random() * 0.008;
    playTone(freq, duration, delay, type, volume);
  }
}

function triggerVideoGlitch(hudElement, onComplete) {
  if (!hudElement) {
    if (onComplete) onComplete();
    return;
  }
  if (hudElement.glitchTimeout) clearTimeout(hudElement.glitchTimeout);

  hudElement.classList.add("glitch-active");
  playGlitchSound();

  hudElement.glitchTimeout = window.setTimeout(() => {
    hudElement.classList.remove("glitch-active");
    hudElement.glitchTimeout = null;
    if (onComplete) onComplete();
  }, 800);
}

function clearVideoGlitch(hudElement) {
  if (!hudElement) return;
  hudElement.classList.remove("glitch-active");
  if (hudElement.glitchTimeout) {
    clearTimeout(hudElement.glitchTimeout);
    hudElement.glitchTimeout = null;
  }
}

function charsMatch(typedChar, targetChar) {
  if (currentTest === "normal" || currentTest === "leaderboard") {
    // Normal and Leaderboard tests are case-sensitive!
    return typedChar === targetChar;
  } else {
    // Vault and Dossier are case-insensitive
    return typedChar.toLowerCase() === targetChar.toLowerCase();
  }
}

function canAcceptTyping() {
  return (testArmed || running) && !testReadyToFinish && !capsLockOn;
}

function getCoinScore(stats) {
  if (stats.typedChars === 0 && stats.mistakes === 0) return 0;
  const speedCoins = Math.round(stats.apm * 1.6);
  const precisionCoins = Math.round(stats.accuracy * 1.5);
  const progressCoins = Math.floor(stats.correctChars / 5);
  const mistakePenalty = stats.mistakes * 10;
  return Math.max(0, 25 + speedCoins + precisionCoins + progressCoins - mistakePenalty);
}

// ═══════════════════════════════════════════════════════════════════
// DYNAMIC SWITCH TEST LOGIC
// ═══════════════════════════════════════════════════════════════════
function switchTest(testType) {
  if (running) {
    running = false;
    clearInterval(timerId);
  }

  currentTest = testType;
  TOTAL_SECONDS = TOTAL_SECONDS_MAP[currentTest];
  localStorage.setItem("tm_selected_variant", testType);

  // Sync Custom Dropdown UI
  if (testSelectorDropdown) {
    const activeOption = Array.from(testSelectorOptions).find(opt => opt.getAttribute("data-val") === testType);
    if (activeOption) {
      testSelectorOptions.forEach(opt => opt.classList.remove("selected"));
      activeOption.classList.add("selected");
      if (currentTestDisplay) currentTestDisplay.textContent = activeOption.textContent;
    }
  }

  // Set the body class
  document.body.className = `theme-${testType}`;

  // Configure Word Pool Difficulty
  if (testType === "kluis") {
    DIFFICULTY_TIERS = DIFFICULTY_TIERS_KLUIS;
  } else if (testType === "dossier") {
    DIFFICULTY_TIERS = DIFFICULTY_TIERS_DOSSIER;
  } else {
    DIFFICULTY_TIERS = DIFFICULTY_TIERS_NORMAL;
  }

  // Update layout header display
  const titleEls = document.querySelectorAll(".test-title");
  titleEls.forEach(el => {
    el.style.display = el.classList.contains(`title-${testType}`) ? "block" : "none";
  });

  const heroTitles = document.querySelectorAll(".page-title");
  heroTitles.forEach(el => {
    el.style.display = el.classList.contains(`title-${testType}`) ? "block" : "none";
  });

  const heroLeads = document.querySelectorAll(".hero-lead");
  heroLeads.forEach(el => {
    el.style.display = el.classList.contains(`lead-${testType}`) ? "block" : "none";
  });

  resetTest();
}

if (testSelectorHeader && testSelectorDropdown) {
  testSelectorHeader.addEventListener("click", (e) => {
    if (running) return;
    testSelectorDropdown.classList.toggle("open");
    e.stopPropagation();
  });

  testSelectorOptions.forEach(option => {
    option.addEventListener("click", () => {
      if (running) return;
      
      const testVal = option.getAttribute("data-val");
      
      testSelectorOptions.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
      
      if (currentTestDisplay) {
        currentTestDisplay.textContent = option.textContent;
      }
      
      testSelectorDropdown.classList.remove("open");
      switchTest(testVal);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// EVENT BINDINGS FOR INPUTS & GAME PLAY
// ═══════════════════════════════════════════════════════════════════
const allInputs = document.querySelectorAll(".typingInput");

allInputs.forEach(input => {
  input.addEventListener("input", (event) => {
    if (input !== getActiveTypingInput()) return;
    if (!canAcceptTyping()) return;

    if (!running) beginTimer();

    const typed = input.value;
    const lastIndex = typed.length - 1;
    const isCorrect = lastIndex < 0 || charsMatch(typed[lastIndex], targetText[lastIndex]);

    mistakeIndex = -1;
    const finalTargetVisible = Math.max(INITIAL_VISIBLE_CHARS, typed.length + BUFFER_CHARS);
    ensureTargetLength(finalTargetVisible + 40);
    renderPrompt();
    updateLiveStats();
    playKeySound(isCorrect);


    if (isCorrect && typed[lastIndex] === ' ') {
      if (currentTest === "kluis") {
        dialRotation += 15;
        if (vaultDial) {
          vaultDial.animate([
            { transform: `rotate(${dialRotation - 15}deg)` },
            { transform: `rotate(${dialRotation + 4}deg)`, offset: 0.43 },
            { transform: `rotate(${dialRotation}deg)` }
          ], {
            duration: 140,
            easing: "ease-out",
            fill: "forwards"
          });
        }
      }
    }

    const wasCalibrated = calibrationComplete;
    checkCalibration();

    if (!wasCalibrated && calibrationComplete) {
      if (selectedDifficulty === "dynamic") {
        const typedLen = input.value.length;
        const searchFrom = typedLen;
        const afterTyped = targetText.substring(searchFrom);
        const match = afterTyped.match(/[.?!]["']?\s/);
        if (match) {
          const breakPoint = searchFrom + match.index + match[0].length;
          targetText = targetText.slice(0, breakPoint).trimEnd();
          targetWords = targetText.split(/\s+/).filter(w => w);
        }
        appendAdaptiveSentences(2);
        showLevelChange(currentDifficultyLabel, "up");
      }
    }
  });

  input.addEventListener("beforeinput", (event) => {
    if (input !== getActiveTypingInput()) return;
    if (!canAcceptTyping()) return;

    if (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") {
      mistakeIndex = -1;
      return;
    }

    if (event.inputType === "insertFromPaste" || !isAllowedInput(event.data)) {
      if (!running) beginTimer();
      event.preventDefault();
      rejectWrongInput(event.data);
      return;
    }

    if (event.inputType.startsWith("insert") && event.data && !running) {
      beginTimer();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (input !== getActiveTypingInput()) return;
    if (!canAcceptTyping() || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key.length !== 1) return;

    if (!running) beginTimer();
    recordKeystroke();

    if (!isAllowedInput(event.key)) {
      event.preventDefault();
      rejectWrongInput(event.key);
    }
  });
});

// Click inside prompt containers to focus input
const promptContainers = document.querySelectorAll(".screen-body, .prompt-container");
promptContainers.forEach(container => {
  container.addEventListener("click", () => {
    if (testReadyToFinish) {
      showResults();
      return;
    }
    const activeInput = getActiveTypingInput();
    if (activeInput && !activeInput.disabled) {
      activeInput.focus();
    }
  });
});

const typingCards = document.querySelectorAll(".typing-card, .normal-typing-card");
typingCards.forEach(card => {
  card.addEventListener("click", () => {
    const activeInput = getActiveTypingInput();
    if (testArmed || running) {
      if (activeInput) activeInput.focus();
    } else if (onboardingComplete && !testReadyToFinish) {
      startTest();
    }
  });
});

// Control buttons
startButton.addEventListener("click", startTest);
finishButton.addEventListener("click", showResults);
resetButton.addEventListener("click", resetTest);
retryResultButton.addEventListener("click", () => {
  resetTest();
  transitionToView(missionLayout, () => {
    startButton.focus();
  });
});

playBriefingButton.addEventListener("click", () => {
  if (!briefingPlaying) {
    startBriefing();
  } else {
    if (briefingVideo) {
      if (briefingVideo.paused) {
        briefingVideo.play().catch(err => console.warn("Video play failed:", err));
      } else {
        briefingVideo.pause();
      }
    }
  }
});
beginMissionButton.addEventListener("click", () => completeOnboarding({ startImmediately: true }));

if (skipEndBriefingButton) {
  skipEndBriefingButton.addEventListener("click", completeEndBriefing);
}

// Video subtitle sync listeners
if (briefingVideo) {
  briefingVideo.addEventListener("timeupdate", () => {
    if (briefingPlaying) {
      updateSubtitles(briefingVideo.currentTime);
    }
  });
  briefingVideo.addEventListener("ended", () => {
    briefingPlaying = false;
    playBriefingButton.textContent = "Briefing voltooid";
    playBriefingButton.disabled = false;
  });
}

if (endBriefingVideo) {
  endBriefingVideo.addEventListener("timeupdate", () => {
    if (endBriefingPlaying) {
      updateEndSubtitles(endBriefingVideo.currentTime);
    }
  });
  endBriefingVideo.addEventListener("ended", completeEndBriefing);
}

startMissionHero.addEventListener("click", (event) => {
  if (!onboardingComplete) {
    event.preventDefault();
    guideToBriefing();
  }
});

// Sound controls
const soundToggles = document.querySelectorAll(".sound-toggle");
soundToggles.forEach(st => {
  st.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    
    soundToggles.forEach(toggle => {
      toggle.setAttribute("aria-pressed", String(soundEnabled));
      toggle.setAttribute("aria-label", soundEnabled ? "Geluid aan" : "Geluid uit");
      toggle.innerHTML = soundEnabled
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
    });

    if (briefingVideo) {
      briefingVideo.muted = !soundEnabled;
    }
    if (endBriefingVideo) {
      endBriefingVideo.muted = !soundEnabled;
    }

    if (soundEnabled) {
      createAudioContext();
      playTone(520, 0.06, 0, "triangle");
    }
  });
});

// Dossier Poster reveal unblur
if (posterContainer) {
  posterContainer.addEventListener("click", () => {
    if (posterContainer.classList.contains("needs-reveal")) {
      posterContainer.classList.remove("needs-reveal");
      posterContainer.classList.add("revealed");
      playTone(700, 0.15, 0, "sine");
    }
  });
}

// Video play/pause toggle controls and state synchronization
function setupVideoControls(video, overlaySelector) {
  if (!video) return;
  const hud = video.closest(".briefing-avatar-hud");
  const overlay = hud ? hud.querySelector(overlaySelector) : null;
  
  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (video === briefingVideo) {
      if (!briefingPlaying) {
        startBriefing();
        return;
      }
      if (video.paused) {
        video.play().catch(err => console.warn("Video play failed:", err));
      } else {
        video.pause();
      }
    } else if (video === endBriefingVideo) {
      if (!endBriefingPlaying) return;
      if (video.paused) {
        video.play().catch(err => console.warn("Video play failed:", err));
      } else {
        video.pause();
      }
    }
  };
  
  video.addEventListener("click", togglePlay);
  if (overlay) {
    overlay.addEventListener("click", togglePlay);
  }
  
  if (hud) {
    // Sync classes on start and when play/pause events fire
    if (video.paused) {
      hud.classList.add("video-paused");
      hud.classList.remove("video-playing");
    } else {
      hud.classList.add("video-playing");
      hud.classList.remove("video-paused");
    }
    
    video.addEventListener("play", () => {
      hud.classList.remove("video-paused");
      hud.classList.add("video-playing");
      if (video === briefingVideo) {
        playBriefingButton.innerHTML = '<span aria-hidden="true">&#9208;</span> Pauzeer briefing';
        playBriefingButton.disabled = false;
      }
    });
    video.addEventListener("pause", () => {
      hud.classList.remove("video-playing");
      hud.classList.add("video-paused");
      if (video === briefingVideo) {
        playBriefingButton.innerHTML = '<span aria-hidden="true">&#9658;</span> Hervat briefing';
        playBriefingButton.disabled = false;
      }
    });
    video.addEventListener("ended", () => {
      hud.classList.remove("video-playing", "video-paused");
      if (video === briefingVideo) {
        playBriefingButton.textContent = "Briefing voltooid";
        playBriefingButton.disabled = false;
      }
    });
  }
}

setupVideoControls(briefingVideo, ".video-hover-overlay");
setupVideoControls(endBriefingVideo, ".video-hover-overlay");

// ═══════════════════════════════════════════════════════════════════
// OTHER INTERACTIVE BEHAVIORS
// ═══════════════════════════════════════════════════════════════════

// Caps lock tracking
function handleCapsLock(isOn) {
  if (capsLockOn === isOn) return;
  capsLockOn = isOn;
  updateOverlay();
}

window.addEventListener("keydown", (event) => {
  if (event.getModifierState) handleCapsLock(event.getModifierState("CapsLock"));
  
  // Prevent focus-trapping on other parts when typing is active
  if (canAcceptTyping() && document.activeElement !== getActiveTypingInput()) {
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const activeInput = getActiveTypingInput();
      if (activeInput) activeInput.focus();
      return;
    }
  }

  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.getModifierState) handleCapsLock(event.getModifierState("CapsLock"));
});

storyProgress.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (!onboardingComplete) {
      clearTimeout(storyTimeoutId);
      playBriefingSlide(index);
    }
  });
});

function updateOverlay() {
  const activeOverlay = getActiveTypingOverlay();
  if (!activeOverlay) return;

  const overlayMsg = activeOverlay.querySelector(".overlayMessage");
  const icon = activeOverlay.querySelector(".overlay-icon");

  if (testFinished || activeMissionView === resultPanel) {
    activeOverlay.classList.add("hidden");
    activeOverlay.classList.remove("caps-lock-warning");
    return;
  }

  if (capsLockOn) {
    if (running && !paused) {
      paused = true;
      pauseStartTime = Date.now();
      startButton.innerHTML = '<span aria-hidden="true">&#9888;</span> Missie gepauzeerd';
    } else if (testArmed) {
      startButton.innerHTML = '<span aria-hidden="true">&#9888;</span> Caps Lock aan';
    }

    activeOverlay.classList.remove("hidden");
    activeOverlay.classList.add("caps-lock-warning");
    if (overlayMsg) overlayMsg.innerHTML = "<strong>Caps Lock staat aan.</strong><br>Zet dit uit om verder te typen.";
    if (icon) icon.innerHTML = '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';
    return;
  }

  if (running && paused) {
    paused = false;
    totalPausedTime += Date.now() - pauseStartTime;
    startButton.innerHTML = '<span aria-hidden="true">&#9632;</span> Missie loopt';
  } else if (testArmed) {
    startButton.innerHTML = '<span aria-hidden="true">&#9201;</span> Klaar voor de start';
  }

  activeOverlay.classList.remove("caps-lock-warning");
  if (running || testArmed) {
    activeOverlay.classList.add("hidden");
  } else {
    activeOverlay.classList.remove("hidden");
    if (onboardingComplete) {
      if (overlayMsg) overlayMsg.innerHTML = "Klik op <strong>Start de test</strong> om te beginnen.";
      if (icon) icon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
    } else {
      if (overlayMsg) overlayMsg.innerHTML = "Wacht op briefing...";
    }
  }
}

// Vault Handle Drag Interaction
const handleSlider = document.querySelector(".handle-slider");
let isDraggingHandle = false;
let startY = 0;
let currentY = 0;
const maxDrag = 42;
let originalStatusText = "";
let handlePullCount = 0;
let lastPullTime = 0;
let isGlitchFrozen = false;
let hasCountedThisPull = false;

if (vaultHandle && handleSlider) {
  const startDrag = (e) => {
    if (running || testFinished || currentTest !== "kluis") return;
    isDraggingHandle = true;
    startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    currentY = 0;

    const activeStatus = document.querySelector(`#${currentTest}ConsoleWrapper .missionStatus`);
    if (!isGlitchFrozen && activeStatus && activeStatus.textContent !== "ACCESS DENIED") {
      originalStatusText = activeStatus.textContent;
    }

    vaultHandle.classList.remove('turned');
    handleSlider.style.transition = 'none';
    document.body.classList.add('is-dragging-handle');

    document.addEventListener('mousemove', dragHandle);
    document.addEventListener('touchmove', dragHandle, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  };

  const dragHandle = (e) => {
    if (!isDraggingHandle) return;
    e.preventDefault();
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - startY;

    if (isGlitchFrozen) {
      currentY = Math.max(0, Math.min(maxDrag + deltaY, maxDrag));
    } else {
      currentY = Math.max(0, Math.min(deltaY, maxDrag));
    }

    handleSlider.style.transform = `translate(-50%, ${currentY}px)`;

    const activeStatus = document.querySelector(`#${currentTest}ConsoleWrapper .missionStatus`);
    if (currentY >= maxDrag * 0.8) {
      if (!isGlitchFrozen) {
        if (activeStatus && activeStatus.textContent !== "ACCESS DENIED") {
          activeStatus.textContent = "ACCESS DENIED";
          activeStatus.style.color = "#e85d75";
          activeStatus.style.textShadow = "0 0 8px rgba(232, 93, 117, 0.5)";
          playTone(150, 0.1, 0, "sawtooth");
        }

        if (!hasCountedThisPull) {
          const now = Date.now();
          if (now - lastPullTime < 1500) {
            handlePullCount++;
          } else {
            handlePullCount = 1;
          }
          lastPullTime = now;
          hasCountedThisPull = true;

          if (handlePullCount >= 15) {
            isGlitchFrozen = true;
            handlePullCount = 0;
            const statusScreen = document.querySelector("#vaultStatusScreen");
            if (statusScreen) statusScreen.classList.add("glitch-effect");
            stopDrag();
            return;
          }
        }
      }
    } else {
      if (currentY < maxDrag * 0.5) {
        hasCountedThisPull = false;
      }

      if (currentY < maxDrag * 0.5 && isGlitchFrozen) {
        isGlitchFrozen = false;
        const statusScreen = document.querySelector("#vaultStatusScreen");
        if (statusScreen) statusScreen.classList.remove("glitch-effect");

        if (activeStatus) {
          activeStatus.textContent = originalStatusText;
          activeStatus.style.color = "";
          activeStatus.style.textShadow = "";
        }
      }

      if (!isGlitchFrozen && activeStatus && activeStatus.textContent === "ACCESS DENIED") {
        activeStatus.textContent = originalStatusText;
        activeStatus.style.color = "";
        activeStatus.style.textShadow = "";
      }
    }
  };

  const stopDrag = () => {
    if (!isDraggingHandle) return;
    isDraggingHandle = false;
    document.body.classList.remove('is-dragging-handle');

    const activeStatus = document.querySelector(`#${currentTest}ConsoleWrapper .missionStatus`);
    if (isGlitchFrozen) {
      handleSlider.style.transition = 'transform 0.2s';
      handleSlider.style.transform = `translate(-50%, ${maxDrag}px)`;
    } else {
      handleSlider.style.transition = '';
      handleSlider.style.transform = '';

      if (activeStatus && activeStatus.textContent === "ACCESS DENIED") {
        activeStatus.textContent = originalStatusText;
        activeStatus.style.color = "";
        activeStatus.style.textShadow = "";
      }
    }

    document.removeEventListener('mousemove', dragHandle);
    document.removeEventListener('touchmove', dragHandle);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  };

  vaultHandle.addEventListener('mousedown', startDrag);
  vaultHandle.addEventListener('touchstart', startDrag, { passive: false });
}

// ═══════════════════════════════════════════════════════════════════
// DIFFICULTY SELECTION & DROP DOWNS
// ═══════════════════════════════════════════════════════════════════
difficultyDropdowns.forEach(dd => {
  const header = dd.querySelector(".difficultyDropdownHeader");
  const list = dd.querySelector(".dropdown-list");
  const display = dd.querySelector(".currentDiffDisplay");

  header.addEventListener("click", (e) => {
    if (running || !onboardingComplete) return;
    dd.classList.toggle("open");
    e.stopPropagation();
  });

  list.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
      if (running || !onboardingComplete) return;
      
      list.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
      item.classList.add("selected");
      
      selectedDifficulty = item.dataset.val;
      display.textContent = item.textContent;
      dd.classList.remove("open");
      
      calibrationComplete = (selectedDifficulty !== "dynamic");
      
      // Update display tags across both dropdowns
      document.querySelectorAll(".currentDiffDisplay").forEach(disp => {
        disp.textContent = item.textContent;
      });
      document.querySelectorAll(".dropdown-list li").forEach(li => {
        li.classList.toggle("selected", li.dataset.val === selectedDifficulty);
      });

      regeneratePreviewText();
    });
  });
});

document.addEventListener("click", () => {
  difficultyDropdowns.forEach(dd => dd.classList.remove("open"));
  if (testSelectorDropdown) {
    testSelectorDropdown.classList.remove("open");
  }
});

// ═══════════════════════════════════════════════════════════════════
// STATS VALUE COUNT-UP ANIMATION
// ═══════════════════════════════════════════════════════════════════
function animateValue(element, start, end, duration, suffix = "") {
  if (!element) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

// ═══════════════════════════════════════════════════════════════════
// RESULT CHARTS DRAWING (SHARED SVG GRAPH ROUTINE)
// ═══════════════════════════════════════════════════════════════════
function renderResultCharts(apm, accuracy) {
  const apmContainer = document.querySelector("#apmChartContainer");
  const accuracyContainer = document.querySelector("#accuracyChartContainer");

  if (!apmContainer || !accuracyContainer) return;

  apmContainer.innerHTML = "";
  accuracyContainer.innerHTML = "";

  // 1. Calculate APM layout coordinates
  const userApmX = getApmX(apm);
  const userApmY = getApmY(userApmX);
  const apmTargetX = 310;
  const apmTargetY = getApmY(apmTargetX);
  const apmAverageX = 370;
  const apmAverageY = getApmY(apmAverageX);
  const apmWrX = 550;
  const apmWrY = getApmY(apmWrX);

  const wrUnlocked = apm >= 120;

  // 2. Generate APM SVG
  const apmSvg = `
    <svg viewBox="0 0 600 200" class="spy-svg-chart">
      <defs>
        <linearGradient id="apmGlowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="var(--blue)" />
          <stop offset="100%" stop-color="var(--purple-soft)" />
        </linearGradient>
        <filter id="apmShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="var(--blue)" flood-opacity="0.4"/>
        </filter>
      </defs>
      
      <!-- Grid Lines -->
      <line x1="30" y1="25" x2="570" y2="25" stroke="rgba(59, 7, 51, 0.08)" stroke-width="1" />
      <line x1="30" y1="87" x2="570" y2="87" stroke="rgba(59, 7, 51, 0.08)" stroke-width="1" />
      <line x1="30" y1="150" x2="570" y2="150" stroke="rgba(59, 7, 51, 0.08)" stroke-width="1" />
      
      <!-- Axis Lines -->
      <line x1="30" y1="150" x2="570" y2="150" stroke="rgba(59, 7, 51, 0.2)" stroke-width="1.5" />

      <!-- Full Background Path -->
      <path d="${generateCurvePath(30, 550)}" fill="none" stroke="var(--line)" stroke-width="5" stroke-linecap="round" />

      <!-- Target lines -->
      <line x1="${apmTargetX}" y1="${apmTargetY}" x2="${apmTargetX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />
      <line x1="${apmAverageX}" y1="${apmAverageY}" x2="${apmAverageX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />
      <line x1="${apmWrX}" y1="${apmWrY}" x2="${apmWrX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />

      <!-- User Pin vertical line -->
      <line x1="${userApmX}" y1="150" x2="${userApmX}" y2="${userApmY}" class="chart-user-line" stroke="var(--blue)" stroke-width="2" stroke-dasharray="3,3" opacity="0" />

      <!-- Colored Progress Path -->
      <path d="${generateCurvePath(30, userApmX)}" fill="none" stroke="url(#apmGlowGrad)" stroke-width="6" stroke-linecap="round" class="chart-progress-path" filter="url(#apmShadow)" />

      <!-- Benchmark Nodes -->
      <g class="chart-node-group" data-tooltip="Diploma: De minimale snelheid die je behaalt na de TypeMission-cursus (120 APM).">
        <circle cx="${apmTargetX}" cy="${apmTargetY}" r="7" fill="var(--paper)" stroke="var(--orange)" stroke-width="3.5" />
        <circle cx="${apmTargetX}" cy="${apmTargetY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${apmTargetX}" y="${apmTargetY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Diploma</text>
        <text x="${apmTargetX}" y="172" text-anchor="middle" class="chart-axis-label-main">120</text>
        <text x="${apmTargetX}" y="188" text-anchor="middle" class="chart-axis-label-sub">APM</text>
      </g>

      <g class="chart-node-group" data-tooltip="Gemiddelde: De gemiddelde snelheid van geslaagde cursisten (167 APM).">
        <circle cx="${apmAverageX}" cy="${apmAverageY}" r="7" fill="var(--paper)" stroke="var(--blue)" stroke-width="3.5" />
        <circle cx="${apmAverageX}" cy="${apmAverageY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${apmAverageX}" y="${apmAverageY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Gemiddelde</text>
        <text x="${apmAverageX}" y="172" text-anchor="middle" class="chart-axis-label-main">167</text>
        <text x="${apmAverageX}" y="188" text-anchor="middle" class="chart-axis-label-sub">APM</text>
      </g>

      <g class="chart-node-group" data-tooltip="Record: Het absolute wereldrecord blindtypen (800+ APM).">
        <circle cx="${apmWrX}" cy="${apmWrY}" r="7" fill="${wrUnlocked ? 'var(--paper)' : '#dcdce2'}" stroke="${wrUnlocked ? 'var(--orange)' : '#a09da4'}" stroke-width="3.5" />
        <circle cx="${apmWrX}" cy="${apmWrY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${apmWrX}" y="${apmWrY + 22}" text-anchor="middle" class="chart-node-label" fill="${wrUnlocked ? 'var(--purple)' : '#a09da4'}">Record</text>
        <text x="${apmWrX}" y="172" text-anchor="middle" class="chart-axis-label-main" fill="${wrUnlocked ? 'var(--purple)' : '#a09da4'}">800+</text>
        <text x="${apmWrX}" y="188" text-anchor="middle" class="chart-axis-label-sub" fill="${wrUnlocked ? 'var(--muted)' : '#a09da4'}">APM</text>
      </g>

      <!-- User Score Pin -->
      <g class="chart-user-node" opacity="0">
        <circle cx="${userApmX}" cy="${userApmY}" r="9" fill="var(--blue)" stroke="var(--paper)" stroke-width="3.5" />
        <circle cx="${userApmX}" cy="${userApmY}" r="16" fill="var(--blue)" opacity="0.25" class="chart-pulse-circle" style="transform-origin: ${userApmX}px ${userApmY}px;" />
        
        <g transform="translate(0, -6)">
          <rect x="${userApmX - 60}" y="${userApmY - 42}" width="120" height="30" rx="6" fill="var(--purple)" />
          <polygon points="${userApmX - 5},${userApmY - 12} ${userApmX + 5},${userApmY - 12} ${userApmX},${userApmY - 5}" fill="var(--purple)" />
          <text x="${userApmX}" y="${userApmY - 22}" text-anchor="middle" font-size="15" font-family="Orbitron" fill="var(--paper)" font-weight="700">${apm} APM</text>
        </g>
      </g>
    </svg>
  `;

  // 3. Calculate Accuracy coordinates
  const userAccX = getAccX(accuracy);
  const userAccY = getApmY(userAccX);
  const accTargetX = 310;
  const accTargetY = getApmY(accTargetX);
  const accAverageX = 370;
  const accAverageY = getApmY(accAverageX);
  const accWrX = 550;
  const accWrY = getApmY(accWrX);
  const accWrUnlocked = accuracy >= 97;

  // 4. Generate Accuracy SVG
  const accuracySvg = `
    <svg viewBox="0 0 600 200" class="spy-svg-chart">
      <defs>
        <linearGradient id="accGlowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="var(--purple)" />
          <stop offset="100%" stop-color="var(--orange-soft)" />
        </linearGradient>
        <filter id="accShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="var(--purple-soft)" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Grid Lines -->
      <line x1="30" y1="25" x2="570" y2="25" stroke="rgba(59, 7, 51, 0.08)" stroke-width="1" />
      <line x1="30" y1="87" x2="570" y2="87" stroke="rgba(59, 7, 51, 0.08)" stroke-width="1" />
      <line x1="30" y1="150" x2="570" y2="150" stroke="rgba(59, 7, 51, 0.08)" stroke-width="1" />
      
      <!-- Axis Lines -->
      <line x1="30" y1="150" x2="570" y2="150" stroke="rgba(59, 7, 51, 0.2)" stroke-width="1.5" />

      <!-- Full Background Path -->
      <path d="${generateCurvePath(30, 550)}" fill="none" stroke="var(--line)" stroke-width="5" stroke-linecap="round" />

      <!-- Target lines -->
      <line x1="${accTargetX}" y1="${accTargetY}" x2="${accTargetX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />
      <line x1="${accAverageX}" y1="${accAverageY}" x2="${accAverageX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />
      <line x1="${accWrX}" y1="${accWrY}" x2="${accWrX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />

      <!-- User Pin vertical line -->
      <line x1="${userAccX}" y1="150" x2="${userAccX}" y2="${userAccY}" class="chart-user-line" stroke="var(--purple)" stroke-width="2" stroke-dasharray="3,3" opacity="0" />

      <!-- Colored Progress Path -->
      <path d="${generateCurvePath(30, userAccX)}" fill="none" stroke="url(#accGlowGrad)" stroke-width="6" stroke-linecap="round" class="chart-progress-path" filter="url(#accShadow)" />

      <!-- Benchmark Nodes -->
      <g class="chart-node-group" data-tooltip="Diploma: De minimale precisie die vereist is om te slagen (97%).">
        <circle cx="${accTargetX}" cy="${accTargetY}" r="7" fill="var(--paper)" stroke="var(--orange)" stroke-width="3.5" />
        <circle cx="${accTargetX}" cy="${accTargetY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${accTargetX}" y="${accTargetY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Diploma</text>
        <text x="${accTargetX}" y="172" text-anchor="middle" class="chart-axis-label-main">97%</text>
        <text x="${accTargetX}" y="188" text-anchor="middle" class="chart-axis-label-sub">Precisie</text>
      </g>

      <g class="chart-node-group" data-tooltip="Gemiddelde: De gemiddelde precisie van geslaagde cursisten (99%).">
        <circle cx="${accAverageX}" cy="${accAverageY}" r="7" fill="var(--paper)" stroke="var(--blue)" stroke-width="3.5" />
        <circle cx="${accAverageX}" cy="${accAverageY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${accAverageX}" y="${accAverageY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Gemiddelde</text>
        <text x="${accAverageX}" y="172" text-anchor="middle" class="chart-axis-label-main">99%</text>
        <text x="${accAverageX}" y="188" text-anchor="middle" class="chart-axis-label-sub">Precisie</text>
      </g>

      <g class="chart-node-group" data-tooltip="Max: De maximale score van 100% foutloze precisie.">
        <circle cx="${accWrX}" cy="${accWrY}" r="7" fill="${accWrUnlocked ? 'var(--paper)' : '#dcdce2'}" stroke="${accWrUnlocked ? 'var(--orange)' : '#a09da4'}" stroke-width="3.5" />
        <circle cx="${accWrX}" cy="${accWrY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${accWrX}" y="${accWrY + 22}" text-anchor="middle" class="chart-node-label" fill="${accWrUnlocked ? 'var(--purple)' : '#a09da4'}">Max</text>
        <text x="${accWrX}" y="172" text-anchor="middle" class="chart-axis-label-main" fill="${accWrUnlocked ? 'var(--purple)' : '#a09da4'}">100%</text>
        <text x="${accWrX}" y="188" text-anchor="middle" class="chart-axis-label-sub" fill="${accWrUnlocked ? 'var(--muted)' : '#a09da4'}">Precisie</text>
      </g>

      <!-- User Score Pin -->
      <g class="chart-user-node" opacity="0">
        <circle cx="${userAccX}" cy="${userAccY}" r="9" fill="var(--orange)" stroke="var(--paper)" stroke-width="3.5" />
        <circle cx="${userAccX}" cy="${userAccY}" r="16" fill="var(--orange-soft)" opacity="0.25" class="chart-pulse-circle" style="transform-origin: ${userAccX}px ${userAccY}px;" />
        
        <g transform="translate(0, -6)">
          <rect x="${userAccX - 60}" y="${userAccY - 42}" width="120" height="30" rx="6" fill="var(--purple)" />
          <polygon points="${userAccX - 5},${userAccY - 12} ${userAccX + 5},${userAccY - 12} ${userAccX},${userAccY - 5}" fill="var(--purple)" />
          <text x="${userAccX}" y="${userAccY - 22}" text-anchor="middle" font-size="15" font-family="Orbitron" fill="var(--paper)" font-weight="700">${accuracy}%</text>
        </g>
      </g>
    </svg>
  `;

  // Inject SVGs into containers
  apmContainer.innerHTML = apmSvg;
  accuracyContainer.innerHTML = accuracySvg;

  // Run line-draw entry animations
  setTimeout(() => {
    document.querySelectorAll(".chart-progress-path").forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect(); // trigger reflow
      path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      path.style.strokeDashoffset = "0";
    });

    document.querySelectorAll(".chart-user-node, .chart-user-line").forEach(el => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.5s ease-out 1.2s";
      el.getBoundingClientRect(); // trigger reflow
      el.style.opacity = "1";
    });
  }, 50);

  setupBenchmarkTooltips();
}

function generateCurvePath(startX, endX) {
  let pathStr = `M ${startX},${getApmY(startX).toFixed(1)}`;
  const steps = 30;
  for (let i = 1; i <= steps; i++) {
    const x = startX + (i / steps) * (endX - startX);
    const y = getApmY(x);
    pathStr += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return pathStr;
}

function getApmY(x) {
  const t = (x - 30) / 520;
  return 150 - (t * (2 - t)) * 140;
}

function getApmX(val) {
  if (val <= 120) {
    return 30 + (Math.max(0, val) / 120) * 280;
  } else if (val <= 167) {
    return 310 + ((val - 120) / (167 - 120)) * 60;
  } else {
    return 370 + (Math.min(800, val - 167) / (800 - 167)) * 180;
  }
}

function getAccX(val) {
  const minAcc = 75;
  if (val <= 97) {
    const pct = Math.max(0, (val - minAcc) / (97 - minAcc));
    return 30 + pct * 280;
  } else if (val <= 99) {
    return 310 + ((val - 97) / (99 - 97)) * 60;
  } else {
    return 370 + ((val - 99) / (100 - 99)) * 180;
  }
}

function setupBenchmarkTooltips() {
  let tooltip = document.getElementById("chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "chart-tooltip";
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);
  }

  const nodes = document.querySelectorAll(".chart-node-group");
  nodes.forEach(node => {
    node.addEventListener("mouseenter", (e) => {
      const text = node.dataset.tooltip;
      tooltip.textContent = text;
      tooltip.classList.add("visible");
      positionTooltip(e.target, tooltip);
    });

    node.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });

    node.addEventListener("mousemove", (e) => {
      positionTooltip(e.target, tooltip);
    });
  });
}

function positionTooltip(target, tooltip) {
  const rect = target.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Position exactly above the node
  const nodeCenterX = rect.left + rect.width / 2 + scrollLeft;
  const nodeTopY = rect.top + scrollTop - 8;

  tooltip.style.left = `${nodeCenterX}px`;
  tooltip.style.top = `${nodeTopY}px`;
}

// ═══════════════════════════════════════════════════════════════════
// COUPON DECRYPTOR SYSTEM
// ═══════════════════════════════════════════════════════════════════
const couponEl = document.querySelector("#couponCode");
if (couponEl) {
  couponEl.addEventListener("click", () => {
    if (couponEl.classList.contains("locked")) {
      decryptCoupon(couponEl, "typtest15");
    } else if (couponEl.classList.contains("decrypted")) {
      navigator.clipboard.writeText(couponEl.textContent.trim()).then(() => {
        const originalText = couponEl.textContent;
        couponEl.textContent = "GEKOPIEERD!";
        couponEl.style.background = "var(--green)";
        couponEl.style.color = "var(--purple)";
        couponEl.style.borderColor = "var(--green)";

        setTimeout(() => {
          couponEl.textContent = originalText;
          couponEl.style.background = "";
          couponEl.style.color = "";
          couponEl.style.borderColor = "";
        }, 1500);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  });
}

function decryptCoupon(element, targetCode) {
  if (element.classList.contains("decrypting") || element.classList.contains("decrypted")) return;

  const initialWidth = element.getBoundingClientRect().width;
  element.style.width = `${initialWidth}px`;

  element.classList.add("decrypting");
  element.classList.remove("locked");
  element.removeAttribute("title");

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
  let iterations = 0;
  const totalIterations = targetCode.length * 4;

  const interval = setInterval(() => {
    let currentText = "";
    for (let i = 0; i < targetCode.length; i++) {
      if (i < Math.floor(iterations / 4)) {
        currentText += targetCode[i];
      } else {
        currentText += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = currentText;
    iterations++;

    if (typeof playTone === "function") {
      playTone(600 + (iterations * 25), 0.02, 0, "sine", 0.008);
    }

    if (iterations >= totalIterations) {
      clearInterval(interval);
      element.textContent = targetCode;
      element.classList.remove("decrypting");
      element.classList.add("decrypted");
      element.setAttribute("title", "Klik om te kopiëren");

      if (typeof playTone === "function") {
        playTone(880, 0.08, 0, "triangle", 0.015);
        playTone(1100, 0.12, 0.06, "triangle", 0.015);
      }
    }
  }, 55);
}

// ═══════════════════════════════════════════════════════════════════
// ENTRY INTRO RUN
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// LEADERBOARD FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_LEADERBOARD = [
  { name: "Miss J", apm: 210, accuracy: 99, isDefault: true, timestamp: Date.now() - 4 * 3600 * 1000 },
  { name: "Cyber Ninja", apm: 190, accuracy: 98, isDefault: true, timestamp: Date.now() - 1 * 3600 * 1000 },
  { name: "Agent Falcon", apm: 175, accuracy: 98, isDefault: true, timestamp: Date.now() - 8 * 3600 * 1000 },
  { name: "Matrix Agent", apm: 160, accuracy: 95, isDefault: true, timestamp: Date.now() - 22 * 3600 * 1000 },
  { name: "Hacker One", apm: 150, accuracy: 97, isDefault: true, timestamp: Date.now() - 1.5 * 24 * 3600 * 1000 },
  { name: "Agent Cobra", apm: 145, accuracy: 97, isDefault: true, timestamp: Date.now() - 2 * 24 * 3600 * 1000 },
  { name: "Prof. Qwerty", apm: 130, accuracy: 96, isDefault: true, timestamp: Date.now() - 3 * 24 * 3600 * 1000 },
  { name: "Crypto Spy", apm: 125, accuracy: 94, isDefault: true, timestamp: Date.now() - 4 * 24 * 3600 * 1000 },
  { name: "Agent Shadow", apm: 110, accuracy: 95, isDefault: true, timestamp: Date.now() - 5 * 24 * 3600 * 1000 },
  { name: "Alpha Prime", apm: 105, accuracy: 93, isDefault: true, timestamp: Date.now() - 6 * 24 * 3600 * 1000 },
  { name: "Ghost Coder", apm: 98, accuracy: 96, isDefault: true, timestamp: Date.now() - 15 * 24 * 3600 * 1000 },
  { name: "Rekruut Bob", apm: 90, accuracy: 94, isDefault: true, timestamp: Date.now() - 10 * 24 * 3600 * 1000 },
  { name: "Delta Force", apm: 88, accuracy: 90, isDefault: true, timestamp: Date.now() - 25 * 24 * 3600 * 1000 },
  { name: "Rekruut Lisa", apm: 75, accuracy: 92, isDefault: true, timestamp: Date.now() - 12 * 24 * 3600 * 1000 },
  { name: "Pixel Ranger", apm: 65, accuracy: 89, isDefault: true, timestamp: Date.now() - 45 * 24 * 3600 * 1000 }
];

let lastSavedScoreEntry = null;
let activePlaceholderEntry = null;

let leaderboardFilters = {
  Story: { period: "all", search: "", page: 1 },
  Play: { period: "all", search: "", page: 1 },
  Result: { period: "all", search: "", page: 1 }
};
const LEADERBOARD_PAGE_SIZE = 5;

// Cookie helper functions
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  
  // Sync to localStorage to support persistent sessions on local file:/// environments
  if (value === "" || days < 0) {
    localStorage.removeItem(name);
  } else {
    localStorage.setItem(name, value);
  }
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  
  // Fallback to localStorage to persist state across reloads on local file:/// environments
  return localStorage.getItem(name);
}

function initLeaderboard() {
  let scores = localStorage.getItem("tm_leaderboard_scores");
  let parsed = null;
  if (scores) {
    try {
      parsed = JSON.parse(scores);
    } catch(e) {}
  }
  // Reset or initialize if no scores, or if schema lacks timestamps, or has less than 15 items
  if (!parsed || !Array.isArray(parsed) || parsed.length < 15 || !parsed.some(e => e.timestamp)) {
    localStorage.setItem("tm_leaderboard_scores", JSON.stringify(DEFAULT_LEADERBOARD));
    scores = JSON.stringify(DEFAULT_LEADERBOARD);
    parsed = JSON.parse(scores);
  }
  return parsed;
}

function saveLeaderboard(scores) {
  localStorage.setItem("tm_leaderboard_scores", JSON.stringify(scores));
}

function getTrophySvg(rank, suffix) {
  let trophyClass = "";
  if (rank === 1) trophyClass = "gold-trophy";
  else if (rank === 2) trophyClass = "silver-trophy";
  else if (rank === 3) trophyClass = "bronze-trophy";

  let fill1, fill2, fill3, fill4, fill5;
  let sparkles = "";

  if (rank === 1) {
    // Premium gold gradients
    fill1 = "#FFE259"; fill2 = "#FFA751"; fill3 = "#FFF3A8"; fill4 = "#E48E35"; fill5 = "#B27400";
    sparkles = `
      <div class="sparkles-container">
        <div class="sparkle sparkle-gold s-1">✦</div>
        <div class="sparkle sparkle-gold s-2">★</div>
        <div class="sparkle sparkle-gold s-3">✦</div>
        <div class="sparkle sparkle-gold s-4">★</div>
        <div class="sparkle sparkle-gold s-5">✦</div>
      </div>
    `;
  } else if (rank === 2) {
    // Premium silver gradients
    fill1 = "#FFFFFF"; fill2 = "#D7DDE8"; fill3 = "#ECEFF1"; fill4 = "#B0BEC5"; fill5 = "#78909C";
    sparkles = `
      <div class="sparkles-container">
        <div class="sparkle sparkle-silver s-1">✦</div>
        <div class="sparkle sparkle-silver s-3">★</div>
        <div class="sparkle sparkle-silver s-4">✦</div>
      </div>
    `;
  } else {
    // Premium bronze gradients
    fill1 = "#FFD1B3"; fill2 = "#CA7345"; fill3 = "#FFCCAB"; fill4 = "#A1532F"; fill5 = "#5A2912";
    sparkles = `
      <div class="sparkles-container">
        <div class="sparkle sparkle-bronze s-2">★</div>
        <div class="sparkle sparkle-bronze s-4">✦</div>
      </div>
    `;
  }

  const gradId = `trophyGrad_${rank}_${suffix}`;
  const reflectId = `metalReflect_${rank}_${suffix}`;
  
  return `
    <div class="trophy-wrapper">
      ${sparkles}
      <svg class="trophy-svg ${trophyClass}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${fill1}" />
            <stop offset="25%" stop-color="${fill2}" />
            <stop offset="50%" stop-color="${fill3}" />
            <stop offset="75%" stop-color="${fill4}" />
            <stop offset="100%" stop-color="${fill5}" />
          </linearGradient>
          <linearGradient id="${reflectId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="white" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="marbleBase_${suffix}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1A1A1A"/>
            <stop offset="50%" stop-color="#333333"/>
            <stop offset="100%" stop-color="#111111"/>
          </linearGradient>
        </defs>
        <!-- Wooden / Marble Base Plinth -->
        <rect x="16" y="48" width="32" height="10" rx="2" fill="url(#marbleBase_${suffix})" stroke="#222" stroke-width="1.5" />
        <!-- Gold base plate -->
        <rect x="25" y="50" width="14" height="6" rx="1" fill="url(#${gradId})" />
        
        <!-- Pedestal Stem -->
        <path d="M26 38h12c0 0 0 5-2 10H30c-2-5-2-10-2-10z" fill="${fill4}" />
        <path d="M28 44h8v4h-8z" fill="url(#${gradId})" />
        
        <!-- Trophy Handles (elegant curved loop style) -->
        <!-- Left Handle -->
        <path d="M16 16c-6 0-8 6-8 12s5 10 9 10c1 0 1-2 0-2c-3 0-7-4-7-8s3-10 6-10" fill="${fill4}" />
        <!-- Right Handle -->
        <path d="M48 16c6 0 8 6 8 12s-5 10-9 10c-1 0-1-2 0-2c3 0 7-4 7-8s-3-10-6-10" fill="${fill4}" />
        
        <!-- Main Cup Body -->
        <path d="M16 12h32v16c0 8.8-7.2 16-16 16s-16-7.2-16-16V12z" fill="url(#${gradId})" />
        
        <!-- Cup Rim (gives it 3D depth) -->
        <ellipse cx="32" cy="12" rx="16" ry="3.5" fill="${fill4}" />
        <ellipse cx="32" cy="12" rx="14" ry="2.2" fill="${fill5}" />
        
        <!-- Shiny metallic highlights on the cup -->
        <!-- Left vertical gloss -->
        <path d="M20 14h3v24h-3z" fill="#FFF" opacity="0.35" />
        <!-- Central light accent -->
        <path d="M30 14h2v28h-2z" fill="#FFF" opacity="0.2" />
        
        <!-- Emblem: Embossed Star -->
        <path d="M32 18l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="#FFF" opacity="0.9" />
      </svg>
      <div class="trophy-shadow"></div>
    </div>
  `;}

function syncSpyNameUI() {
  const savedName = getCookie("tm_spy_name");

  ["Story", "Play", "Result"].forEach(view => {
    const form = document.querySelector(`#leaderboardForm${view}`);
    const savedMsg = document.querySelector(`#leaderboardSavedMessage${view}`);
    const displaySpyName = document.querySelector(`#savedSpyNameDisplay${view}`);
    const nameInput = document.querySelector(`#leaderboardNameInput${view}`);
    const feedbackEl = document.querySelector(`#leaderboardFeedback${view}`);

    if (feedbackEl) {
      feedbackEl.style.display = "none";
      feedbackEl.textContent = "";
    }

    if (savedName) {
      if (form) form.style.display = "none";
      if (savedMsg) savedMsg.style.display = "inline-flex";
      if (displaySpyName) displaySpyName.textContent = savedName;
    } else {
      if (view === "Result") {
        if (form) form.style.display = "block";
      } else {
        if (form) form.style.display = "none";
      }
      if (savedMsg) savedMsg.style.display = "none";
      if (nameInput) nameInput.value = "";
    }
  });
}

function renderLeaderboard(highlightIndex = -1, placeholderEntry = null) {
  const scores = initLeaderboard();
  
  if (placeholderEntry !== null) {
    activePlaceholderEntry = placeholderEntry;
  }
  if (highlightIndex !== -1) {
    activePlaceholderEntry = null;
  }
  
  // Auto-focus page jumping logic when score is saved or placeholder shown
  if (highlightIndex !== -1) {
    const targetPage = highlightIndex >= 3 ? Math.floor((highlightIndex - 3) / LEADERBOARD_PAGE_SIZE) + 1 : 1;
    ["Story", "Play", "Result"].forEach(key => {
      leaderboardFilters[key].period = "all";
      leaderboardFilters[key].search = "";
      leaderboardFilters[key].page = targetPage;

      // Sync DOM elements
      const searchInp = document.querySelector(`#leaderboardSearch${key}`);
      if (searchInp) searchInp.value = "";
      const tabs = document.querySelectorAll(`#leaderboardSection${key} .tab-btn`);
      tabs.forEach(btn => {
        if (btn.getAttribute("data-period") === "all") btn.classList.add("active");
        else btn.classList.remove("active");
      });
    });
  } else if (placeholderEntry) {
    // When the placeholder is first rendered, default results page to Page 1
    // so they see the top 5 competitors immediately and see a fully populated leaderboard.
    leaderboardFilters.Result.period = "all";
    leaderboardFilters.Result.search = "";
    leaderboardFilters.Result.page = 1;
    
    const searchInp = document.querySelector("#leaderboardSearchResult");
    if (searchInp) searchInp.value = "";
    const tabs = document.querySelectorAll("#leaderboardSectionResult .tab-btn");
    tabs.forEach(btn => {
      if (btn.getAttribute("data-period") === "all") btn.classList.add("active");
      else btn.classList.remove("active");
    });
  }

  const views = [
    { key: "Story", bodySel: "#leaderboardBodyStory", podiumSel: "#leaderboardPodiumStory", previewSel: "#leaderboardMiniPodiumStory", showPlaceholder: false, suffix: "story" },
    { key: "Play", bodySel: "#leaderboardBodyPlay", podiumSel: "#leaderboardPodiumPlay", previewSel: "#leaderboardMiniPodiumPlay", showPlaceholder: false, suffix: "play" },
    { key: "Result", bodySel: "#leaderboardBodyResult", podiumSel: "#leaderboardPodiumResult", previewSel: "#leaderboardMiniPodiumResult", showPlaceholder: true, suffix: "result" }
  ];

  views.forEach(view => {
    let viewScores = [...scores];
    let activeHighlightIndex = highlightIndex;

    if (view.showPlaceholder && activePlaceholderEntry) {
      viewScores.push(activePlaceholderEntry);
      viewScores.sort((a, b) => {
        const aApm = a.apm !== undefined ? a.apm : 0;
        const bApm = b.apm !== undefined ? b.apm : 0;
        const aAcc = a.accuracy !== undefined ? a.accuracy : 0;
        const bAcc = b.accuracy !== undefined ? b.accuracy : 0;
        if (bApm !== aApm) return bApm - aApm;
        return bAcc - aAcc;
      });
      if (activePlaceholderEntry.isPlaceholder) {
        activeHighlightIndex = viewScores.findIndex(e => e.isPlaceholder);
      }
    } else {
      viewScores.sort((a, b) => {
        const aApm = a.apm !== undefined ? a.apm : 0;
        const bApm = b.apm !== undefined ? b.apm : 0;
        const aAcc = a.accuracy !== undefined ? a.accuracy : 0;
        const bAcc = b.accuracy !== undefined ? b.accuracy : 0;
        if (bApm !== aApm) return bApm - aApm;
        return bAcc - aAcc;
      });
    }

    // 1. Timeframe filtering
    const now = Date.now();
    const filterState = leaderboardFilters[view.key];
    const period = filterState.period;

    let timeframeFiltered = [...viewScores];
    if (period === "daily") {
      timeframeFiltered = timeframeFiltered.filter(e => e.isPlaceholder || (e.timestamp && (now - e.timestamp <= 24 * 3600 * 1000)));
    } else if (period === "weekly") {
      timeframeFiltered = timeframeFiltered.filter(e => e.isPlaceholder || (e.timestamp && (now - e.timestamp <= 7 * 24 * 3600 * 1000)));
    } else if (period === "monthly") {
      timeframeFiltered = timeframeFiltered.filter(e => e.isPlaceholder || (e.timestamp && (now - e.timestamp <= 30 * 24 * 3600 * 1000)));
    }

    // Sort timeframeFiltered just to be safe
    timeframeFiltered.sort((a, b) => {
      const aApm = a.apm !== undefined ? a.apm : 0;
      const bApm = b.apm !== undefined ? b.apm : 0;
      const aAcc = a.accuracy !== undefined ? a.accuracy : 0;
      const bAcc = b.accuracy !== undefined ? b.accuracy : 0;
      if (bApm !== aApm) return bApm - aApm;
      return bAcc - aAcc;
    });

    // Find new active highlight index in the timeframeFiltered list
    let viewHighlightIdx = -1;
    if (activePlaceholderEntry && view.showPlaceholder) {
      viewHighlightIdx = timeframeFiltered.findIndex(e => e.isPlaceholder);
    } else {
      let targetHighlightIndex = highlightIndex;
      if (targetHighlightIndex === -1) {
        const savedName = getCookie("tm_spy_name");
        if (savedName) {
          const userScores = timeframeFiltered
            .map((entry, idx) => ({ entry, idx }))
            .filter(x => x.entry.name && x.entry.name.toLowerCase() === savedName.toLowerCase() && !x.entry.isPlaceholder);
          if (userScores.length > 0) {
            userScores.sort((a, b) => {
              const aApm = a.entry.apm !== undefined ? a.entry.apm : 0;
              const bApm = b.entry.apm !== undefined ? b.entry.apm : 0;
              const aAcc = a.entry.accuracy !== undefined ? a.entry.accuracy : 0;
              const bAcc = b.entry.accuracy !== undefined ? b.entry.accuracy : 0;
              if (bApm !== aApm) return bApm - aApm;
              return bAcc - aAcc;
            });
            viewHighlightIdx = userScores[0].idx;
          }
        }
      } else if (highlightIndex !== -1 && highlightIndex < scores.length) {
        const targetEntry = scores[highlightIndex];
        viewHighlightIdx = timeframeFiltered.findIndex(e => e === targetEntry);
      }
    }

    // 2. Render preview badges (always reflect overall timeframe, unaffected by active searches)
    if (typeof renderPreviewBadges === "function") {
      renderPreviewBadges(timeframeFiltered, viewHighlightIdx, view.previewSel);
    }

    // 3. Render podium
    const podiumEl = document.querySelector(view.podiumSel);
    const searchVal = filterState.search.toLowerCase().trim();

    if (podiumEl) {
      if (searchVal) {
        podiumEl.style.display = "none";
      } else {
        podiumEl.style.display = "flex";
        
        const top3 = timeframeFiltered.slice(0, 3);
        while (top3.length < 3) {
          top3.push({ name: "—", apm: 0, accuracy: 0 });
        }

        // Podium order: 2nd (left), 1st (middle), 3rd (right)
        const podiumOrder = [
          { entry: top3[1], rank: 2, className: "second" },
          { entry: top3[0], rank: 1, className: "first" },
          { entry: top3[2], rank: 3, className: "third" }
        ];

        const podiumHtml = podiumOrder.map(item => {
          let colClasses = `podium-column ${item.className}`;
          if (item.entry.isPlaceholder) {
            colClasses += " placeholder-column user-highlight";
          } else {
            const itemIndexInTimeframe = timeframeFiltered.findIndex(e => e === item.entry);
            if (itemIndexInTimeframe !== -1 && itemIndexInTimeframe === viewHighlightIdx) {
              colClasses += " user-highlight";
            }
          }

          const entryApm = item.entry.apm !== undefined ? item.entry.apm : 0;
          const entryAcc = item.entry.accuracy !== undefined ? item.entry.accuracy : 0;
          const trophyHtml = entryApm > 0 ? getTrophySvg(item.rank, view.suffix) : '<div style="height:90px;"></div>';

          return `
            <div class="${colClasses}">
              <div class="avatar-badge">${trophyHtml}</div>
              <div class="spy-name">${escapeHTML(item.entry.name)}</div>
              <div class="spy-score">${entryApm > 0 ? `${entryApm} APM` : '—'}</div>
              <div class="podium-pedestal">
                <span class="podium-number">${item.rank}</span>
                ${entryAcc > 0 ? `<span class="podium-accuracy-sub">${entryAcc}% acc</span>` : ''}
              </div>
            </div>
          `;
        }).join("");

        podiumEl.innerHTML = podiumHtml;
      }
    }

    // 4. Render list rows (pagination applied)
    const bodyEl = document.querySelector(view.bodySel);
    if (bodyEl) {
      bodyEl.innerHTML = "";
      
      let listScores = [];
      if (searchVal) {
        listScores = timeframeFiltered.filter(e => e.name && e.name.toLowerCase().includes(searchVal));
      } else {
        listScores = timeframeFiltered.slice(3); // skip top 3 when not searching
      }

      const totalRows = listScores.length;
      const totalPages = Math.max(1, Math.ceil(totalRows / LEADERBOARD_PAGE_SIZE));

      // Clamp current page
      filterState.page = Math.min(Math.max(1, filterState.page), totalPages);
      const currentPage = filterState.page;

      const startIdx = (currentPage - 1) * LEADERBOARD_PAGE_SIZE;
      const endIdx = startIdx + LEADERBOARD_PAGE_SIZE;
      const pageScores = listScores.slice(startIdx, endIdx);

      if (pageScores.length === 0) {
        const noDataRow = document.createElement("div");
        noDataRow.style.textAlign = "center";
        noDataRow.style.padding = "20px";
        noDataRow.style.color = "var(--muted)";
        noDataRow.style.fontFamily = "Orbitron, sans-serif";
        noDataRow.style.fontSize = "0.9rem";
        noDataRow.textContent = "GEEN AGENTEN GEVONDEN";
        bodyEl.appendChild(noDataRow);
      } else {
        pageScores.forEach((entry, idx) => {
          const row = document.createElement("div");
          row.className = "leaderboard-row";

          // Find original index in timeframeFiltered to show its true rank
          const originalIdxInTimeframe = timeframeFiltered.findIndex(e => e === entry);
          if (entry.isPlaceholder) {
            row.className += " placeholder-row user-highlight";
          } else if (originalIdxInTimeframe !== -1 && originalIdxInTimeframe === viewHighlightIdx) {
            row.className += " user-highlight";
          }

          const rankDisplay = originalIdxInTimeframe !== -1 ? originalIdxInTimeframe + 1 : "—";
          const entryApm = entry.apm !== undefined ? entry.apm : 0;
          const entryAcc = entry.accuracy !== undefined ? entry.accuracy : 0;

          row.innerHTML = `
            <div class="col-rank">${rankDisplay}</div>
            <div class="col-name">${escapeHTML(entry.name)}</div>
            <div class="col-wpm">${entryApm}</div>
            <div class="col-accuracy">${entryAcc}%</div>
          `;
          bodyEl.appendChild(row);
        });
      }

      // Update Pagination buttons state and info
      const prevBtn = document.querySelector(`#leaderboardPrevBtn${view.key}`);
      const nextBtn = document.querySelector(`#leaderboardNextBtn${view.key}`);
      const pageInfo = document.querySelector(`#leaderboardPageInfo${view.key}`);

      if (prevBtn) prevBtn.disabled = currentPage === 1;
      if (nextBtn) nextBtn.disabled = currentPage === totalPages;
      if (pageInfo) pageInfo.textContent = `Pagina ${currentPage} van ${totalPages}`;
    }
  });
}

function escapeHTML(str) {
  if (str === null || str === undefined) return "Anonieme Spion";
  return String(str).replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Bind Submit Button Event Listener (Result screen only)
const leaderboardSubmitBtnResult = document.querySelector("#leaderboardSubmitBtnResult");
const leaderboardNameInputResult = document.querySelector("#leaderboardNameInputResult");

if (leaderboardSubmitBtnResult && leaderboardNameInputResult) {
  leaderboardSubmitBtnResult.addEventListener("click", () => {
    const name = leaderboardNameInputResult.value.trim();
    const feedbackEl = document.querySelector("#leaderboardFeedbackResult");

    if (feedbackEl) {
      feedbackEl.style.display = "none";
      feedbackEl.textContent = "";
    }

    if (!name) {
      if (feedbackEl) {
        feedbackEl.className = "leaderboard-feedback error";
        feedbackEl.textContent = "Vul een geldige spionnennaam in!";
        feedbackEl.style.display = "flex";
      } else {
        alert("Vul een spionnennaam in!");
      }
      return;
    }

    // Check for duplicates
    const scores = initLeaderboard();
    const nameExists = scores.some(e => e.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
      if (feedbackEl) {
        feedbackEl.className = "leaderboard-feedback error";
        feedbackEl.textContent = "Deze spionnennaam is al bezet. Kies een unieke naam!";
        feedbackEl.style.display = "flex";
      } else {
        alert("Deze spionnennaam is al bezet. Kies een unieke naam!");
      }
      return;
    }

    const stats = resultStats || getTypedStats(finalElapsed);
    
    // Add new score
    const newEntry = { name: name, apm: stats.apm, accuracy: stats.accuracy, isDefault: false, timestamp: Date.now() };
    scores.push(newEntry);
    
    // Sort and save
    scores.sort((a, b) => {
      if (b.apm !== a.apm) return b.apm - a.apm;
      return b.accuracy - a.accuracy;
    });

    saveLeaderboard(scores);
    lastSavedScoreEntry = newEntry;

    // Set cookie to remember name
    setCookie("tm_spy_name", name, 365);
    
    // Find index of new entry to highlight it
    const highlightIdx = scores.findIndex(e => e.name === name && e.apm === stats.apm && e.accuracy === stats.accuracy);
    
    syncSpyNameUI();
    renderLeaderboard(highlightIdx);
  });
}

// Bind Change Name Button Event Listeners for all screens
["Story", "Play", "Result"].forEach(view => {
  const btn = document.querySelector(`#changeSpyNameBtn${view}`);
  if (btn) {
    btn.addEventListener("click", () => {
      // Delete cookie
      setCookie("tm_spy_name", "", -1);

      // Remove last saved entry from local storage if exists
      if (lastSavedScoreEntry) {
        const scores = initLeaderboard();
        const matchIdx = scores.findIndex(e => e.name === lastSavedScoreEntry.name && e.apm === lastSavedScoreEntry.apm && e.accuracy === lastSavedScoreEntry.accuracy);
        if (matchIdx !== -1) {
          scores.splice(matchIdx, 1);
          saveLeaderboard(scores);
        }
        lastSavedScoreEntry = null;
      }

      // Sync UI across all screens
      syncSpyNameUI();

      // Focus Result input form name field if it exists
      const nameInputResult = document.querySelector("#leaderboardNameInputResult");
      if (nameInputResult) {
        nameInputResult.value = "";
        nameInputResult.focus();
      }

      // Re-render with Jij placeholder if there is an active session score
      if (resultStats) {
        const placeholderEntry = { name: "Jij", apm: resultStats.apm, accuracy: resultStats.accuracy, isPlaceholder: true };
        renderLeaderboard(-1, placeholderEntry);
      } else {
        renderLeaderboard(-1, null);
      }
    });
  }
});

function renderPreviewBadges(scoresList, highlightIdx, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = "";

  const top3 = scoresList.slice(0, 3);
  while (top3.length < 3) {
    top3.push({ name: "—", apm: 0, accuracy: 0 });
  }

  const suffix = containerSelector.replace("#leaderboardMiniPodium", "").toLowerCase(); // "story", "play", "result"

  // Create mini-podium-wrapper
  const podiumWrapper = document.createElement("div");
  podiumWrapper.className = "mini-podium-wrapper";

  // Podium order: 2nd (left), 1st (middle), 3rd (right)
  const podiumOrder = [
    { entry: top3[1], rank: 2, className: "second" },
    { entry: top3[0], rank: 1, className: "first" },
    { entry: top3[2], rank: 3, className: "third" }
  ];

  const podiumHtml = podiumOrder.map(item => {
    let colClasses = `mini-podium-column ${item.className}`;
    const entryApm = item.entry.apm !== undefined ? item.entry.apm : 0;
    const isPlaceholder = item.entry.isPlaceholder;

    // Check if this column is highlighted
    const itemIndexInScores = scoresList.findIndex(e => e === item.entry);
    if (isPlaceholder || (itemIndexInScores !== -1 && itemIndexInScores === highlightIdx)) {
      colClasses += " user-highlight";
    }

    const nameDisplay = item.entry.name || "—";
    const apmDisplay = entryApm > 0 ? `${entryApm} APM` : "—";
    const trophyHtml = entryApm > 0 ? getTrophySvg(item.rank, `mini_${suffix}`) : '<div style="height:44px;"></div>';

    return `
      <div class="${colClasses}">
        <div class="mini-avatar-trophy">${trophyHtml}</div>
        <div class="mini-name">${escapeHTML(nameDisplay)}</div>
        <div class="mini-score">${apmDisplay}</div>
        <div class="mini-pedestal">${item.rank}</div>
      </div>
    `;
  }).join("");

  podiumWrapper.innerHTML = podiumHtml;
  container.appendChild(podiumWrapper);

  // If the user stands at rank >= 4 (index >= 3), append their user standing badge
  if (highlightIdx >= 3 && highlightIdx < scoresList.length) {
    const userEntry = scoresList[highlightIdx];
    const userBadge = document.createElement("div");
    userBadge.className = "mini-user-badge";

    const name = userEntry.name || "Jij";
    const apm = userEntry.apm !== undefined ? userEntry.apm : 0;
    const rank = highlightIdx + 1;

    userBadge.innerHTML = `
      <span class="mini-user-rank">#${rank}</span>
      <span>${escapeHTML(name)} (${apm})</span>
    `;
    container.appendChild(userBadge);
  }

  // Update middle status HUD
  const statusEl = document.querySelector(containerSelector.replace("MiniPodium", "Status"));
  if (statusEl) {
    const savedName = getCookie("tm_spy_name");
    
    // Find user's best score in scoresList (ignoring placeholders)
    const userEntries = scoresList.filter(e => e.name && savedName && e.name.toLowerCase() === savedName.toLowerCase() && !e.isPlaceholder);
    
    if (userEntries.length > 0) {
      userEntries.sort((a, b) => b.apm - a.apm);
      const bestEntry = userEntries[0];
      const overallRank = scoresList.findIndex(e => e === bestEntry) + 1;
      
      statusEl.innerHTML = `
        <div class="status-hud-title">
          <span class="radar-pulse-dot"></span>
          Verbinding Actief
        </div>
        <div class="status-hud-telemetry">
          <span class="telemetry-item">Agent: <strong>${escapeHTML(savedName)}</strong></span>
          <span class="telemetry-divider">//</span>
          <span class="telemetry-item">Rang: <strong>#${overallRank}</strong></span>
          <span class="telemetry-divider">//</span>
          <span class="telemetry-item">Record: <strong>${bestEntry.apm} APM</strong></span>
        </div>
      `;
    } else {
      statusEl.innerHTML = `
        <div class="status-hud-title">
          <span class="radar-pulse-dot" style="background-color: var(--orange); box-shadow: 0 0 6px var(--orange); animation-name: radarPulseOrange;"></span>
          Huidige Missie
        </div>
        <div class="status-hud-telemetry justify-center">
          <span class="telemetry-item promo-text">Start de typetest om deel te nemen!</span>
        </div>
      `;
    }
  }
}

function toggleLeaderboard(view, targetState) {
  const container = document.querySelector(`#leaderboardSection${view}`);
  const preview = document.querySelector(`#leaderboardPreview${view}`);
  const expanded = document.querySelector(`#leaderboardExpanded${view}`);
  
  if (!container || !preview || !expanded) return;

  const isExpanded = targetState === "expanded";

  if (isExpanded) {
    container.classList.remove("collapsed");
    
    if (window.gsap) {
      container.style.transition = "none";
      preview.style.transition = "none";
      const ranks = ["first", "second", "third"];

      // Kill any lingering tweens
      gsap.killTweensOf(preview);
      gsap.killTweensOf(expanded);
      gsap.killTweensOf(container);
      
      const miniWrapper = preview.querySelector(".mini-podium-wrapper");
      const expandBtn = preview.querySelector(".leaderboard-expand-btn");
      const userBadge = preview.querySelector(".mini-user-badge");
      const statusBtn = preview.querySelector(".leaderboard-preview-status");

      if (miniWrapper) gsap.killTweensOf(miniWrapper);
      if (expandBtn) gsap.killTweensOf(expandBtn);
      if (userBadge) gsap.killTweensOf(userBadge);
      if (statusBtn) gsap.killTweensOf(statusBtn);

      ranks.forEach(rank => {
        const bigCol = expanded.querySelector(`.podium-column.${rank}`);
        if (bigCol) {
          gsap.killTweensOf(bigCol);
          gsap.set(bigCol, { clearProps: "all" });
          const pedestal = bigCol.querySelector(".podium-pedestal");
          if (pedestal) {
            gsap.killTweensOf(pedestal);
            gsap.set(pedestal, { clearProps: "all" });
          }
        }
      });

      // Calculate slide offset for miniWrapper to slide to center
      let slideX = 0;
      if (miniWrapper) {
        const frameRect = preview.getBoundingClientRect();
        const wrapperRect = miniWrapper.getBoundingClientRect();
        const currentLeft = wrapperRect.left - frameRect.left;
        const targetLeft = (frameRect.width - wrapperRect.width) / 2;
        slideX = targetLeft - currentLeft;
      }

      // Create timeline for initial slide
      const tl = gsap.timeline();

      // PHASE 1: Fade out expand button, user badge, and status HUD, and slide mini podium to the center
      if (expandBtn) {
        tl.to(expandBtn, { opacity: 0, x: 20, duration: 0.22, ease: "power2.in" }, 0);
      }
      if (userBadge) {
        tl.to(userBadge, { opacity: 0, x: 20, duration: 0.22, ease: "power2.in" }, 0);
      }
      if (statusBtn) {
        tl.to(statusBtn, { opacity: 0, scale: 0.9, duration: 0.22, ease: "power2.in" }, 0);
      }
      if (miniWrapper) {
        tl.to(miniWrapper, { x: slideX, duration: 0.45, ease: "power2.inOut" }, 0.05);
      }

      // PHASE 2: Scale up mini-podium and drop down while growing the container
      tl.add(() => {
        // Capture current container height (= preview frame height)
        const previewHeight = container.offsetHeight;

        // Float the preview on top so it overlays the expanding content
        container.style.position = "relative";
        preview.style.position = "absolute";
        preview.style.top = "0";
        preview.style.left = "0";
        preview.style.right = "0";
        preview.style.zIndex = "10";
        preview.style.pointerEvents = "none";
        preview.style.background = "transparent";
        preview.style.overflow = "visible";

        // Show expanded content underneath at natural height to measure it
        expanded.style.display = "block";
        expanded.style.opacity = "1";
        expanded.style.height = "auto";
        expanded.style.overflow = "visible";
        expanded.style.paddingTop = "30px";
        expanded.style.paddingBottom = "30px";

        // Measure the full natural height of expanded
        const expandedNaturalHeight = expanded.offsetHeight;

        // Lock container to preview height, overflow visible during transition to prevent clipping
        container.style.height = `${previewHeight}px`;
        container.style.overflow = "visible";

        // Get sub-elements
        const podiumCols = ranks.map(r => expanded.querySelector(`.podium-column.${r}`)).filter(Boolean);
        const pedestals = podiumCols.map(col => col.querySelector(".podium-pedestal")).filter(Boolean);

        const header = expanded.querySelector(".leaderboard-header");
        const tabs = expanded.querySelector(".leaderboard-tabs");
        const search = expanded.querySelector(".leaderboard-search");
        const list = expanded.querySelector(".leaderboard-list");
        const pagination = expanded.querySelector(".leaderboard-pagination");
        const bigW = expanded.querySelector(".podium-wrapper");

        // Set initial states: big podium columns invisible (but scale 1), other elements invisible
        podiumCols.forEach(col => {
          gsap.set(col, { opacity: 0, scale: 1 });
        });
        pedestals.forEach(ped => {
          gsap.set(ped, { scaleY: 1 });
        });
        if (header) gsap.set(header, { opacity: 0, y: -20 });
        if (tabs) gsap.set(tabs, { opacity: 0, x: -30 });
        if (search) gsap.set(search, { opacity: 0, x: 30 });
        if (list) gsap.set(list, { opacity: 0, y: 30 });
        if (pagination) gsap.set(pagination, { opacity: 0, y: 30 });

        // Build the entrance timeline
        const entranceTl = gsap.timeline({
          onComplete: () => {
            // Clean up all temporary overrides
            preview.style.display = "none";
            preview.style.position = "";
            preview.style.top = "";
            preview.style.left = "";
            preview.style.right = "";
            preview.style.zIndex = "";
            preview.style.pointerEvents = "";
            preview.style.opacity = "";
            preview.style.background = "";
            preview.style.overflow = "";
            preview.style.transition = "";
            if (miniWrapper) gsap.set(miniWrapper, { clearProps: "all" });
            if (expandBtn) gsap.set(expandBtn, { clearProps: "all" });
            if (userBadge) gsap.set(userBadge, { clearProps: "all" });
            if (statusBtn) gsap.set(statusBtn, { clearProps: "all" });

            container.style.height = "";
            container.style.overflow = "";
            container.style.position = "";
            container.style.transition = "";
            expanded.style.height = "";
            expanded.style.overflow = "";
            expanded.style.paddingTop = "";
            expanded.style.paddingBottom = "";
            podiumCols.forEach(col => gsap.set(col, { clearProps: "all" }));
            pedestals.forEach(ped => gsap.set(ped, { clearProps: "all" }));
            
            ranks.forEach(rank => {
              const mCol = preview.querySelector(`.mini-podium-column.${rank}`);
              if (mCol) {
                const mTrophy = mCol.querySelector(".mini-avatar-trophy");
                const mPed = mCol.querySelector(".mini-pedestal");
                const mName = mCol.querySelector(".mini-name");
                const mScore = mCol.querySelector(".mini-score");
                if (mTrophy) {
                  gsap.set(mTrophy, { clearProps: "all" });
                  const mSvg = mTrophy.querySelector(".trophy-svg");
                  if (mSvg) gsap.set(mSvg, { clearProps: "all" });
                }
                if (mPed) gsap.set(mPed, { clearProps: "all" });
                if (mName) gsap.set(mName, { clearProps: "all" });
                if (mScore) gsap.set(mScore, { clearProps: "all" });
              }
            });

            if (header) gsap.set(header, { clearProps: "all" });
            if (tabs) gsap.set(tabs, { clearProps: "all" });
            if (search) gsap.set(search, { clearProps: "all" });
            if (list) gsap.set(list, { clearProps: "all" });
            if (pagination) gsap.set(pagination, { clearProps: "all" });
          }
        });

        // Step A: Grow container height smoothly
        entranceTl.to(container, {
          height: expandedNaturalHeight,
          duration: 0.7,
          ease: "power2.inOut"
        }, 0);

        // Step B: Morph sub-elements of mini-podium individually to match big podium
        ranks.forEach(rank => {
          const mCol = preview.querySelector(`.mini-podium-column.${rank}`);
          const bCol = expanded.querySelector(`.podium-column.${rank}`);
          if (mCol && bCol) {
            const mTrophy = mCol.querySelector(".mini-avatar-trophy");
            const bTrophy = bCol.querySelector(".avatar-badge");
            const mPed = mCol.querySelector(".mini-pedestal");
            const bPed = bCol.querySelector(".podium-pedestal");
            const mName = mCol.querySelector(".mini-name");
            const mScore = mCol.querySelector(".mini-score");
            const bName = bCol.querySelector(".spy-name");
            const bScore = bCol.querySelector(".spy-score");

            // Morph name (uniform scale)
            if (mName && bName) {
              const rectMini = mName.getBoundingClientRect();
              const rectBig = bName.getBoundingClientRect();
              if (rectMini.width > 0 && rectBig.width > 0) {
                const scale = rectBig.height / rectMini.height;
                const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
                const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);

                entranceTl.to(mName, {
                  x: `+=${deltaX}`,
                  y: `+=${deltaY}`,
                  scale: scale,
                  transformOrigin: "center center",
                  duration: 0.7,
                  ease: "power2.inOut"
                }, 0);
              }
            }

            // Morph score (uniform scale)
            if (mScore && bScore) {
              const rectMini = mScore.getBoundingClientRect();
              const rectBig = bScore.getBoundingClientRect();
              if (rectMini.width > 0 && rectBig.width > 0) {
                const scale = rectBig.height / rectMini.height;
                const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
                const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);

                entranceTl.to(mScore, {
                  x: `+=${deltaX}`,
                  y: `+=${deltaY}`,
                  scale: scale,
                  transformOrigin: "center center",
                  duration: 0.7,
                  ease: "power2.inOut"
                }, 0);
              }
            }

            // Morph trophy (uniform scale on .trophy-svg to preserve aspect ratio)
            if (mTrophy && bTrophy) {
              const mSvg = mTrophy.querySelector(".trophy-svg") || mTrophy;
              const bSvg = bTrophy.querySelector(".trophy-svg") || bTrophy;
              const rectMini = mSvg.getBoundingClientRect();
              const rectBig = bSvg.getBoundingClientRect();
              if (rectMini.width > 0 && rectBig.width > 0) {
                const scale = rectBig.height / rectMini.height;
                const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
                const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);

                entranceTl.to(mTrophy, {
                  x: `+=${deltaX}`,
                  y: `+=${deltaY}`,
                  scale: scale,
                  transformOrigin: "center center",
                  duration: 0.7,
                  ease: "power2.inOut"
                }, 0);
              }
            }

            // Morph pedestal
            if (mPed && bPed) {
              const rectMini = mPed.getBoundingClientRect();
              const rectBig = bPed.getBoundingClientRect();
              if (rectMini.width > 0 && rectBig.width > 0) {
                const scaleX = rectBig.width / rectMini.width;
                const scaleY = rectBig.height / rectMini.height;
                const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
                const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);

                entranceTl.to(mPed, {
                  x: `+=${deltaX}`,
                  y: `+=${deltaY}`,
                  scaleX: scaleX,
                  scaleY: scaleY,
                  transformOrigin: "center center",
                  duration: 0.7,
                  ease: "power2.inOut"
                }, 0);
              }
            }
          }
        });

        // Step C: Quick cross-fade when positions match (ends exactly at 0.7s)
        if (miniWrapper) {
          entranceTl.to(miniWrapper, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.out"
          }, 0.55);
        }
        podiumCols.forEach(col => {
          entranceTl.to(col, {
            opacity: 1,
            duration: 0.15,
            ease: "power2.out"
          }, 0.55);
        });

        // Step D: Fade and slide in remaining elements from edges
        if (header) {
          entranceTl.to(header, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.5);
        }
        if (tabs) {
          entranceTl.to(tabs, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 0.5);
        }
        if (search) {
          entranceTl.to(search, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 0.5);
        }
        if (list) {
          entranceTl.to(list, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55);
        }
        if (pagination) {
          entranceTl.to(pagination, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55);
        }
      });

    } else {
      preview.style.display = "none";
      expanded.style.display = "block";
    }
  } else {
    container.classList.add("collapsed");

    if (window.gsap) {
      container.style.transition = "none";
      preview.style.transition = "none";
      const ranks = ["first", "second", "third"];

      // Kill any lingering tweens
      gsap.killTweensOf(preview);
      gsap.killTweensOf(expanded);
      gsap.killTweensOf(container);
      
      const miniWrapper = preview.querySelector(".mini-podium-wrapper");
      const expandBtn = preview.querySelector(".leaderboard-expand-btn");
      const userBadge = preview.querySelector(".mini-user-badge");
      const statusBtn = preview.querySelector(".leaderboard-preview-status");

      if (miniWrapper) gsap.killTweensOf(miniWrapper);
      if (expandBtn) gsap.killTweensOf(expandBtn);
      if (userBadge) gsap.killTweensOf(userBadge);
      if (statusBtn) gsap.killTweensOf(statusBtn);

      ranks.forEach(rank => {
        const bigCol = expanded.querySelector(`.podium-column.${rank}`);
        if (bigCol) {
          gsap.killTweensOf(bigCol);
          const pedestal = bigCol.querySelector(".podium-pedestal");
          if (pedestal) gsap.killTweensOf(pedestal);
        }
      });

      // Get elements
      const podiumCols = ranks.map(r => expanded.querySelector(`.podium-column.${r}`)).filter(Boolean);
      const pedestals = podiumCols.map(col => col.querySelector(".podium-pedestal")).filter(Boolean);
      
      const header = expanded.querySelector(".leaderboard-header");
      const tabs = expanded.querySelector(".leaderboard-tabs");
      const search = expanded.querySelector(".leaderboard-search");
      const list = expanded.querySelector(".leaderboard-list");
      const pagination = expanded.querySelector(".leaderboard-pagination");
      const bigW = expanded.querySelector(".podium-wrapper");

      // Lock expanded to current height for smooth shrink
      const currentHeight = expanded.offsetHeight;
      container.style.height = `${currentHeight}px`;
      container.style.overflow = "visible";
      container.style.position = "relative";

      // Show preview temporarily overlayed to measure it
      preview.style.display = "flex";
      preview.style.opacity = "1";
      preview.style.position = "absolute";
      preview.style.top = "0";
      preview.style.left = "0";
      preview.style.right = "0";
      preview.style.zIndex = "10";
      preview.style.pointerEvents = "none";
      preview.style.background = "transparent";
      preview.style.overflow = "visible";

      const previewHeight = preview.offsetHeight;

      // Calculate slideX for centered miniWrapper
      let slideX = 0;
      if (miniWrapper) {
        const frameRect = preview.getBoundingClientRect();
        const wrapperRect = miniWrapper.getBoundingClientRect();
        const currentLeft = wrapperRect.left - frameRect.left;
        const targetLeft = (frameRect.width - wrapperRect.width) / 2;
        slideX = targetLeft - currentLeft;
      }

      // Measure rects to compute start state for miniWrapper
      ranks.forEach(rank => {
        const mCol = preview.querySelector(`.mini-podium-column.${rank}`);
        const bCol = expanded.querySelector(`.podium-column.${rank}`);
        if (mCol && bCol) {
          const mTrophy = mCol.querySelector(".mini-avatar-trophy");
          const bTrophy = bCol.querySelector(".avatar-badge");
          const mPed = mCol.querySelector(".mini-pedestal");
          const bPed = bCol.querySelector(".podium-pedestal");
          const mName = mCol.querySelector(".mini-name");
          const mScore = mCol.querySelector(".mini-score");
          const bName = bCol.querySelector(".spy-name");
          const bScore = bCol.querySelector(".spy-score");

          // Temporarily put miniWrapper at centered position, scale 1 to measure rects
          gsap.set(miniWrapper, { x: slideX, y: 0, scale: 1 });

          // Trophy start transforms (uniform scale on .trophy-svg)
          if (mTrophy && bTrophy) {
            const mSvg = mTrophy.querySelector(".trophy-svg") || mTrophy;
            const bSvg = bTrophy.querySelector(".trophy-svg") || bTrophy;
            const rectMini = mSvg.getBoundingClientRect();
            const rectBig = bSvg.getBoundingClientRect();
            if (rectMini.width > 0 && rectBig.width > 0) {
              const scale = rectBig.height / rectMini.height;
              const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
              const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);
              gsap.set(mTrophy, {
                x: deltaX,
                y: deltaY,
                scale: scale,
                transformOrigin: "center center"
              });
            }
          }

          // Pedestal start transforms
          if (mPed && bPed) {
            const rectMini = mPed.getBoundingClientRect();
            const rectBig = bPed.getBoundingClientRect();
            if (rectMini.width > 0 && rectBig.width > 0) {
              const scaleX = rectBig.width / rectMini.width;
              const scaleY = rectBig.height / rectMini.height;
              const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
              const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);
              gsap.set(mPed, {
                x: deltaX,
                y: deltaY,
                scaleX: scaleX,
                scaleY: scaleY,
                transformOrigin: "center center"
              });
            }
          }

          // Name start transforms
          if (mName && bName) {
            const rectMini = mName.getBoundingClientRect();
            const rectBig = bName.getBoundingClientRect();
            if (rectMini.width > 0 && rectBig.width > 0) {
              const scale = rectBig.height / rectMini.height;
              const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
              const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);
              gsap.set(mName, {
                x: deltaX,
                y: deltaY,
                scale: scale,
                transformOrigin: "center center"
              });
            }
          }

          // Score start transforms
          if (mScore && bScore) {
            const rectMini = mScore.getBoundingClientRect();
            const rectBig = bScore.getBoundingClientRect();
            if (rectMini.width > 0 && rectBig.width > 0) {
              const scale = rectBig.height / rectMini.height;
              const deltaX = (rectBig.left + rectBig.width / 2) - (rectMini.left + rectMini.width / 2);
              const deltaY = (rectBig.top + rectBig.height / 2) - (rectMini.top + rectMini.height / 2);
              gsap.set(mScore, {
                x: deltaX,
                y: deltaY,
                scale: scale,
                transformOrigin: "center center"
              });
            }
          }
        }
      });

      // Initialize miniWrapper itself to centered and fully visible (but its key contents are morphed)
      if (miniWrapper) {
        gsap.set(miniWrapper, {
          x: slideX,
          y: 0,
          scale: 1,
          opacity: 0
        });
      }
      if (expandBtn) gsap.set(expandBtn, { opacity: 0 });
      if (userBadge) gsap.set(userBadge, { opacity: 0 });
      if (statusBtn) gsap.set(statusBtn, { opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Hide expanded, clean up
          expanded.style.display = "none";
          expanded.style.height = "";
          expanded.style.overflow = "";
          expanded.style.opacity = "";
          expanded.style.paddingTop = "";
          expanded.style.paddingBottom = "";
          
          preview.style.position = "";
          preview.style.top = "";
          preview.style.left = "";
          preview.style.right = "";
          preview.style.zIndex = "";
          preview.style.pointerEvents = "";
          preview.style.opacity = "";
          preview.style.background = "";
          preview.style.overflow = "";
          preview.style.transition = "";

          container.style.height = "";
          container.style.overflow = "";
          container.style.position = "";
          container.style.transition = "";

          podiumCols.forEach(col => gsap.set(col, { clearProps: "all" }));
          pedestals.forEach(ped => gsap.set(ped, { clearProps: "all" }));
          if (miniWrapper) gsap.set(miniWrapper, { clearProps: "all" });
          if (expandBtn) gsap.set(expandBtn, { clearProps: "all" });
          if (userBadge) gsap.set(userBadge, { clearProps: "all" });
          if (statusBtn) gsap.set(statusBtn, { clearProps: "all" });

          ranks.forEach(rank => {
            const mCol = preview.querySelector(`.mini-podium-column.${rank}`);
            if (mCol) {
              const mTrophy = mCol.querySelector(".mini-avatar-trophy");
              const mPed = mCol.querySelector(".mini-pedestal");
              const mName = mCol.querySelector(".mini-name");
              const mScore = mCol.querySelector(".mini-score");
              if (mTrophy) {
                gsap.set(mTrophy, { clearProps: "all" });
                const mSvg = mTrophy.querySelector(".trophy-svg");
                if (mSvg) gsap.set(mSvg, { clearProps: "all" });
              }
              if (mPed) gsap.set(mPed, { clearProps: "all" });
              if (mName) gsap.set(mName, { clearProps: "all" });
              if (mScore) gsap.set(mScore, { clearProps: "all" });
            }
          });

          if (header) gsap.set(header, { clearProps: "all" });
          if (tabs) gsap.set(tabs, { clearProps: "all" });
          if (search) gsap.set(search, { clearProps: "all" });
          if (list) gsap.set(list, { clearProps: "all" });
          if (pagination) gsap.set(pagination, { clearProps: "all" });
        }
      });

      // PHASE 1: Slide out / fade out all other elements
      if (header) tl.to(header, { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }, 0);
      if (tabs) tl.to(tabs, { opacity: 0, x: -30, duration: 0.2, ease: "power2.in" }, 0);
      if (search) tl.to(search, { opacity: 0, x: 30, duration: 0.2, ease: "power2.in" }, 0);
      if (list) tl.to(list, { opacity: 0, y: 30, duration: 0.25, ease: "power2.in" }, 0);
      if (pagination) tl.to(pagination, { opacity: 0, y: 30, duration: 0.25, ease: "power2.in" }, 0);

      // PHASE 2: Cross-fade big podium columns to miniWrapper
      podiumCols.forEach(col => {
        tl.to(col, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in"
        }, 0.15);
      });
      if (miniWrapper) {
        tl.to(miniWrapper, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.in"
        }, 0.15);
      }

      // PHASE 3: Shrink container height and shrink/move miniWrapper sub-elements back to centered position
      tl.to(container, {
        height: previewHeight,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0.25);
      
      ranks.forEach(rank => {
        const mCol = preview.querySelector(`.mini-podium-column.${rank}`);
        if (mCol) {
          const mTrophy = mCol.querySelector(".mini-avatar-trophy");
          const mPed = mCol.querySelector(".mini-pedestal");
          const mName = mCol.querySelector(".mini-name");
          const mScore = mCol.querySelector(".mini-score");

          if (mTrophy) {
            tl.to(mTrophy, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.25);
          }
          if (mPed) {
            tl.to(mPed, {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.25);
          }
          if (mName) {
            tl.to(mName, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.25);
          }
          if (mScore) {
            tl.to(mScore, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut"
            }, 0.25);
          }
        }
      });

      // PHASE 4: Slide miniWrapper back to the left, and fade in button / badge / status HUD
      if (miniWrapper) {
        tl.to(miniWrapper, { x: 0, duration: 0.45, ease: "power2.inOut" }, 0.85);
      }
      if (expandBtn) {
        tl.to(expandBtn, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 1.1);
      }
      if (userBadge) {
        tl.to(userBadge, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 1.1);
      }
      if (statusBtn) {
        tl.to(statusBtn, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 1.1);
      }

    } else {
      expanded.style.display = "none";
      preview.style.display = "flex";
    }
  }
}

function resetLeaderboardCollapseStates() {
  const storyPreview = document.querySelector("#leaderboardPreviewStory");
  const storyExpanded = document.querySelector("#leaderboardExpandedStory");
  const storyContainer = document.querySelector("#leaderboardSectionStory");
  if (storyPreview && storyExpanded && storyContainer) {
    storyContainer.classList.add("collapsed");
    storyPreview.style.display = "flex";
    storyPreview.style.height = "auto";
    storyPreview.style.opacity = "1";
    storyPreview.style.paddingTop = "16px";
    storyPreview.style.paddingBottom = "16px";
    storyExpanded.style.display = "none";
    storyExpanded.style.height = "0";
    storyExpanded.style.opacity = "0";
    storyExpanded.style.paddingTop = "0";
    storyExpanded.style.paddingBottom = "0";
  }

  const playPreview = document.querySelector("#leaderboardPreviewPlay");
  const playExpanded = document.querySelector("#leaderboardExpandedPlay");
  const playContainer = document.querySelector("#leaderboardSectionPlay");
  if (playPreview && playExpanded && playContainer) {
    playContainer.classList.add("collapsed");
    playPreview.style.display = "flex";
    playPreview.style.height = "auto";
    playPreview.style.opacity = "1";
    playPreview.style.paddingTop = "16px";
    playPreview.style.paddingBottom = "16px";
    playExpanded.style.display = "none";
    playExpanded.style.height = "0";
    playExpanded.style.opacity = "0";
    playExpanded.style.paddingTop = "0";
    playExpanded.style.paddingBottom = "0";
  }

  const resultPreview = document.querySelector("#leaderboardPreviewResult");
  const resultExpanded = document.querySelector("#leaderboardExpandedResult");
  const resultContainer = document.querySelector("#leaderboardSectionResult");
  if (resultPreview && resultExpanded && resultContainer) {
    resultContainer.classList.remove("collapsed");
    resultPreview.style.display = "none";
    resultPreview.style.height = "0";
    resultPreview.style.opacity = "0";
    resultPreview.style.paddingTop = "0";
    resultPreview.style.paddingBottom = "0";
    resultExpanded.style.display = "block";
    resultExpanded.style.height = "auto";
    resultExpanded.style.opacity = "1";
    resultExpanded.style.paddingTop = "30px";
    resultExpanded.style.paddingBottom = "30px";
  }
}

function setupLeaderboardToggles() {
  ["Story", "Play", "Result"].forEach(view => {
    const previewBar = document.querySelector(`#leaderboardPreview${view}`);
    const collapseBtn = document.querySelector(`#leaderboardCollapseBtn${view}`);
    
    if (previewBar) {
      previewBar.addEventListener("click", () => {
        toggleLeaderboard(view, "expanded");
      });
    }

    if (collapseBtn) {
      collapseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLeaderboard(view, "collapsed");
      });
    }
  });
}

function setupLeaderboardControls() {
  const views = ["Story", "Play", "Result"];

  views.forEach(key => {
    // 1. Period filter tabs event listeners
    const section = document.querySelector(`#leaderboardSection${key}`);
    if (section) {
      const tabs = section.querySelectorAll(".tab-btn");
      tabs.forEach(btn => {
        btn.addEventListener("click", () => {
          tabs.forEach(t => t.classList.remove("active"));
          btn.classList.add("active");

          const period = btn.getAttribute("data-period") || "all";
          leaderboardFilters[key].period = period;
          leaderboardFilters[key].page = 1; // Reset to page 1 on filter change
          
          renderLeaderboard();
        });
      });
    }

    // 2. Search input event listener
    const searchInp = document.querySelector(`#leaderboardSearch${key}`);
    if (searchInp) {
      searchInp.addEventListener("input", () => {
        leaderboardFilters[key].search = searchInp.value;
        leaderboardFilters[key].page = 1; // Reset to page 1 on search change
        renderLeaderboard();
      });
    }

    // 3. Pagination buttons event listeners
    const prevBtn = document.querySelector(`#leaderboardPrevBtn${key}`);
    const nextBtn = document.querySelector(`#leaderboardNextBtn${key}`);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (leaderboardFilters[key].page > 1) {
          leaderboardFilters[key].page--;
          renderLeaderboard();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        leaderboardFilters[key].page++;
        renderLeaderboard();
      });
    }
  });
}

setupLeaderboardToggles();
setupLeaderboardControls();
syncSpyNameUI();
resetLeaderboardCollapseStates();
runIntroAnimations();

const savedVariant = localStorage.getItem("tm_selected_variant") || "kluis";
switchTest(savedVariant);
