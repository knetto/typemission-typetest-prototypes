const TOTAL_SECONDS = 1;
const INITIAL_WORDS = 14;
const WORD_BATCH = 9;
const BUFFER_CHARS = 50;
const INITIAL_VISIBLE_CHARS = 100;

// ═══════════════════════════════════════════════════════════════════
// ADAPTIVE DIFFICULTY SYSTEM
// Sentences are grouped into 4 tiers. The system picks sentences
// based on the typist's rolling APM, blending tiers smoothly so
// there is never a jarring switch. All sentences remain logical
// and readable Dutch text in the spy/vault theme.
// ═══════════════════════════════════════════════════════════════════

const DIFFICULTY_TIERS = {
  // Tier 1: EASY — Simple words, short sentences, no punctuation beyond periods
  // Target: < 80 APM
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
    "Alle bouten zijn los en de kluis staat open.",
  ],

  // Tier 2: MEDIUM — Commas, longer sentences, slightly harder vocabulary
  // Target: 80-99 APM
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
    "Het systeem wist alle sporen, zodat niemand weet dat we hier waren.",
  ],

  // Tier 3: HARD — Semicolons, colons, exclamation marks, question marks,
  //         quotes, dashes, more complex sentence structures
  // Target: 100-119 APM
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
    "\"Terugtrekken!\" beveelt Miss J. De missie is voltooid; tijd om te gaan.",
  ],

  // Tier 4: EXPERT — Numbers, technical terms, IP addresses, codes,
  //         complex punctuation combinations, mixed content
  // Target: 120+ APM
  expert: [
    "De kluis staat op server 192.168.1.47; het wachtwoord is X7-bQ9#mK.",
    "Bout 1 heeft code A4-F8, bout 2 is R2-D2 en bout 3 is J9-K3.",
    "Het systeem meldt: \"Error 403; toegang geweigerd op poort 8080.\"",
    "De timer staat op 00:30; de code is 7491-BRAVO-28 en de kluis beeft.",
    "Agent 007 rapporteert: \"Sector 12, verdieping 3, kluis nummer 48.\"",
    "De versleuteling gebruikt AES-256; dat zijn 2^256 mogelijke codes!",
    "\"Code rood op niveau 5!\" schreeuwt de operator. Tijd: 14:37:02.",
    "Het IP-adres 10.0.0.1 stuurt 4.096 pakketjes per seconde naar de kluis.",
    "De 5 bouten hebben codes: #A1b, #B2c, #C3d, #D4e en #E5f.",
    "Missie X-47: kraak kluis 12B op verdieping 3 voor 15:00 uur.",
    "Het wachtwoord is 8 tekens lang: Kz4!pL9@ en het verandert elke 30s.",
    "De firewall blokkeert poorten 22, 80, 443 en 8443; alleen 3389 is open.",
    "Agent-ID: SP-2847; missie-code: FALCON-19; locatie: 51.2194, 4.4025.",
    "De frequentie is 147.300 MHz; het signaal heeft een sterkte van -42 dBm.",
    "\"Status update: bout 4/5 gekraakt; resterend: 1; ETA: 12 seconden.\"",
    "Het encryptie-algoritme draait op 3.2 GHz en kraakt 10^6 codes per uur.",
    "Beveiligingscode: V8k#2Lm!; vervaldatum: 18-05-2026; niveau: GEHEIM.",
    "De dataset bevat 2.400 bestanden (47,3 GB) verspreid over 12 servers.",
    "Coördinaten: N51 13'10\" O4 24'09\"; ETA aankomst: 22:15 uur.",
    "Het alarm reset na 45s; de code verandert dan naar X2-M7-Q4@!.",
  ],
};

// ── Difficulty blending weights per APM range ──
// Thresholds are deliberately LOW so the system responds quickly.
// After just one short calibration sentence (~25 chars) we already
// have a reliable APM reading and can pick the right tier.
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

  if (a < 50) {
    return { easy: 1, medium: 0, hard: 0, expert: 0 };
  }
  if (a < 70) {
    // 50-70: blend easy → medium
    const t = (a - 50) / 20;
    return { easy: 1 - t * 0.6, medium: t * 0.6, hard: 0, expert: 0 };
  }
  if (a < 85) {
    // 70-85: medium dominant, hard emerging
    const t = (a - 70) / 15;
    return { easy: 0.1 - t * 0.1, medium: 0.65 - t * 0.25, hard: t * 0.5, expert: 0 };
  }
  if (a < 100) {
    // 85-100: hard dominant, expert emerging
    const t = (a - 85) / 15;
    return { easy: 0, medium: 0.25 - t * 0.15, hard: 0.6 - t * 0.15, expert: t * 0.45 };
  }
  if (a < 130) {
    // 100-130: expert dominant
    const t = (a - 100) / 30;
    return { easy: 0, medium: 0.05 - t * 0.05, hard: 0.35 - t * 0.15, expert: 0.6 + t * 0.2 };
  }
  // 130+ APM: almost all expert
  return { easy: 0, medium: 0, hard: 0.15, expert: 0.85 };
}

// Pick a random tier based on the weights
function pickTier(weights) {
  const rand = Math.random();
  let cumulative = 0;
  for (const [tier, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (rand <= cumulative) return tier;
  }
  return "easy"; // fallback
}

// Track which sentences have been used recently to avoid repetition
const usedSentences = new Set();
const MAX_USED_MEMORY = 30;

function pickSentence(apm) {
  const weights = getDifficultyWeights(apm);
  const tier = pickTier(weights);
  const pool = DIFFICULTY_TIERS[tier];

  // Try to find an unused sentence
  let attempts = 0;
  let sentence;
  do {
    sentence = pool[Math.floor(Math.random() * pool.length)];
    attempts += 1;
  } while (usedSentences.has(sentence) && attempts < pool.length);

  // Track used sentences
  usedSentences.add(sentence);
  if (usedSentences.size > MAX_USED_MEMORY) {
    const firstKey = usedSentences.values().next().value;
    usedSentences.delete(firstKey);
  }

  return sentence;
}

// ── Calibration system ──
// The first two sentences are shown at the start (easy text).
// Once the user completes the first sentence, calibration is finished,
// we determine their APM, and generate subsequent sentences at the proper difficulty.
let firstSentenceLength = 0;
let calibrationComplete = false;

// Build initial text: FOUR short easy sentences to prevent starvation
function buildInitialText() {
  const s1 = pickSentence(0);
  const s2 = pickSentence(0);
  const s3 = pickSentence(0);
  const s4 = pickSentence(0);
  firstSentenceLength = s1.length;
  return [s1, s2, s3, s4].join(" ");
}

// Regenerate preview text when difficulty changes (before test starts)
// Uses a scramble animation: characters cycle through random glyphs before
// settling on the new text, like a spy decoder machine.
function regeneratePreviewText() {
  usedSentences.clear();
  const s1 = pickSentence(0);
  const s2 = pickSentence(0);
  const s3 = pickSentence(0);
  const s4 = pickSentence(0);
  firstSentenceLength = s1.length;
  const newText = [s1, s2, s3, s4].join(" ");

  targetWords = newText.split(/\s+/);
  targetText = targetWords.join(" ");

  // Scramble animation
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
      // Characters settle left-to-right: already-settled chars show final text
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
      // Final render with proper styling
      renderPrompt();
      // If the test is armed (input not disabled), refocus so typing works immediately
      if (!typingInput.disabled) {
        typingInput.focus();
      }
    }
  }

  scrambleStep();
}

// ── Rolling APM tracker ──
// Short 3-second window so the system reacts fast.
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
  if (rollingWindow.length < 4) return 0; // need at least 4 keystrokes
  const now = performance.now();
  while (rollingWindow.length > 0 && now - rollingWindow[0] > ROLLING_WINDOW_MS) {
    rollingWindow.shift();
  }
  if (rollingWindow.length < 4) return 0;
  const windowDuration = (now - rollingWindow[0]) / 1000;
  if (windowDuration < 0.5) return 0; // need at least 0.5s of data
  return Math.round((rollingWindow.length / windowDuration) * 60);
}

// Check if calibration is done (user finished the first sentence)
function checkCalibration() {
  if (calibrationComplete) return;
  const typed = typingInput.value.length;
  if (typed >= firstSentenceLength) {
    calibrationComplete = true;
  }
}

let currentDifficultyLabel = "Basis";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const timerEl = document.querySelector("#timer");
const liveWpmEl = document.querySelector("#liveWpm");
const mistakeCountEl = document.querySelector("#mistakeCount");
const accuracyEl = document.querySelector("#accuracy");
const uploadPercentEl = document.querySelector("#uploadPercent");
const uploadFillEl = document.querySelector("#uploadFill");
const uploadChecks = document.querySelectorAll(".crack-checkpoint");
const promptTextEl = document.querySelector("#promptText");
// NOTE: This selector is crucial for the typing input functionality. Do NOT modify without careful testing.
const typingInput = document.querySelector("#typingInput");
const typingCard = document.querySelector("#vaultCodePanel");
// NOTE: Fix to ensure typing input works correctly. Do NOT modify this comment; Gemini may overwrite it.
const typingOverlay = document.querySelector("#typingOverlay");
const overlayMessage = document.querySelector("#overlayMessage");
const startButton = document.querySelector("#startButton");
const finishButton = document.querySelector("#finishButton");
const resetButton = document.querySelector("#resetButton");
const difficultyDropdown = document.querySelector("#difficultyDropdown");
const difficultyDropdownHeader = document.querySelector("#difficultyDropdownHeader");
const currentDiffDisplay = document.querySelector("#currentDiffDisplay");
const difficultyOptions = document.querySelectorAll(".dropdown-list li");
let selectedDifficulty = "dynamic";

if (difficultyDropdownHeader) {
  difficultyDropdownHeader.addEventListener("click", (e) => {
    e.stopPropagation();
    // Block dropdown once typing has started
    if (running) return;

    const wasOpen = difficultyDropdown.classList.contains("open");
    difficultyDropdown.classList.toggle("open");

    // If we just closed it, restore focus to typing area if armed
    if (wasOpen && !typingInput.disabled) {
      typingInput.focus();
    }
  });

  difficultyOptions.forEach(option => {
    option.addEventListener("click", () => {
      const prev = selectedDifficulty;
      selectedDifficulty = option.getAttribute("data-val");
      difficultyOptions.forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
      currentDiffDisplay.textContent = option.textContent;
      difficultyDropdown.classList.remove("open");

      // Regenerate text when difficulty changes before test starts
      if (prev !== selectedDifficulty && !running) {
        regeneratePreviewText();
      } else if (!typingInput.disabled) {
        // If no scramble happened but test is armed, restore focus immediately
        typingInput.focus();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (difficultyDropdown && !difficultyDropdown.contains(e.target)) {
      if (difficultyDropdown.classList.contains("open")) {
        difficultyDropdown.classList.remove("open");
        if (!typingInput.disabled) typingInput.focus();
      }
    }
  });
}

const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const trialButton = document.querySelector("#trialButton");
const buyButton = document.querySelector("#buyButton");
const ctaFeedback = document.querySelector("#ctaFeedback");
const soundToggle = document.querySelector("#soundToggle");
const missionStatus = document.querySelector("#missionStatus");
const missionMessage = document.querySelector("#missionMessage");
const missionSteps = document.querySelectorAll(".mission-steps li");
const missionStage = document.querySelector("#missionStage");
const morphFlash = document.querySelector("#morphFlash");
const storyStage = document.querySelector("#storyStage");
const missionLayout = document.querySelector("#missionLayout");
const storyText = document.querySelector("#storyText");
const storyProgress = document.querySelectorAll("#storyStage .story-progress span");
const playBriefingButton = document.querySelector("#playBriefingButton");
const beginMissionButton = document.querySelector("#beginMissionButton");
const briefingVideo = document.querySelector("#briefingVideo");
const endBriefingStage = document.querySelector("#endBriefingStage");
const endBriefingVideo = document.querySelector("#endBriefingVideo");
const endBriefingText = document.querySelector("#endBriefingText");
const skipEndBriefingButton = document.querySelector("#skipEndBriefingButton");
const startMissionHero = document.querySelector("#startMissionHero");
const completeWpm = document.querySelector("#completeWpm");
const completeAccuracy = document.querySelector("#completeAccuracy");
const completeMistakes = document.querySelector("#completeMistakes");
const completeCoins = document.querySelector("#completeCoins");
const rankBadge = document.querySelector("#rankBadge");
const unlockNote = document.querySelector("#unlockNote");
const retryResultButton = document.querySelector("#retryResultButton");
const startLiveBadge = document.querySelector("#startLiveBadge");

// Vault elements
const vaultDial = document.querySelector("#vaultDial");
const vaultDoor = document.querySelector("#vaultDoor");
const vaultHandle = document.querySelector("#vaultHandle");
const codeStatus = document.querySelector("#codeStatus");
const bolts = [document.querySelector("#bolt1"), document.querySelector("#bolt2"), document.querySelector("#bolt3"), document.querySelector("#bolt4"), document.querySelector("#bolt5")];
const vaultWrapper = document.querySelector(".vault-wrapper");
let dialRotation = 0;

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
let activeMissionView = storyStage;
let viewTransitioning = false;

function runIntroAnimations() {
  // Animate site-header
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

  // Animate hero-copy elements with a stagger
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

  // Intersection Observer for scroll reveal elements
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
  const hasCentering = element.classList.contains("crack-checkpoint");
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

  // Set height dynamically for transition
  missionStage.style.height = `${currentHeight}px`;
  missionStage.style.overflow = "hidden";

  // Position nextView temporarily to measure its natural layout height
  nextView.style.position = "absolute";
  nextView.style.width = "100%";
  nextView.style.height = "auto";
  nextView.style.visibility = "hidden";
  nextView.hidden = false;
  nextView.classList.add("active");

  const nextHeight = nextView.offsetHeight;

  // Reset nextView temporary layout styles
  nextView.style.inset = "";
  nextView.style.height = "";
  nextView.style.visibility = "";
  nextView.style.opacity = "0";

  // Set currentView absolute for perfect overlapping during transition
  currentView.style.position = "absolute";
  currentView.style.top = "0";
  currentView.style.left = "0";
  currentView.style.width = "100%";

  nextView.style.position = "absolute";
  nextView.style.top = "0";
  nextView.style.left = "0";
  nextView.style.width = "100%";

  // Easing and durations matching reduced motion settings
  const easingCurve = "cubic-bezier(0.16, 1, 0.3, 1)"; // easeOutExpo

  // morphFlash slide across
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

  // Current view slide up, scale down, and fade out
  const fadeOutAnim = currentView.animate([
    { opacity: 1, transform: "translateY(0) scale(1)" },
    { opacity: 0, transform: "translateY(-30px) scale(0.95)" }
  ], {
    duration: 450,
    easing: easingCurve
  });

  // missionStage height animation
  const heightAnim = missionStage.animate([
    { height: `${currentHeight}px` },
    { height: `${nextHeight}px` }
  ], {
    duration: 600,
    easing: easingCurve
  });

  // Next view slide up, scale up, and fade in
  const fadeInAnim = nextView.animate([
    { opacity: 0, transform: "translateY(30px) scale(0.95)" },
    { opacity: 1, transform: "translateY(0) scale(1)" }
  ], {
    duration: 550,
    delay: 50,
    easing: easingCurve,
    fill: "forwards"
  });

  // Stagger animations for nextView child components
  if (nextView === missionLayout) {
    const consolePanel = nextView.querySelector(".vault-console");
    const gamesPanel = nextView.querySelector(".vault-games-footer");
    if (consolePanel) {
      consolePanel.animate([
        { opacity: 0, transform: "translateY(30px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], {
        duration: 600,
        delay: 100,
        easing: easingCurve,
        fill: "both"
      });
    }
    if (gamesPanel) {
      gamesPanel.animate([
        { opacity: 0, transform: "translateY(30px) scale(0.98)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], {
        duration: 600,
        delay: 200,
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

    // Clear main views styling
    clearAnimatedStyles(currentView);
    clearAnimatedStyles(nextView);
    clearAnimatedStyles(morphFlash);
    clearAnimatedStyles(missionStage);
    missionStage.classList.remove("is-transitioning");

    // Clear child elements that were stagger-animated
    const childSelectors = [
      ".briefing-panel", ".vault-console",
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
    if (completed === 4) {
      forceComplete();
    }
  }

  flashAnim.onfinish = checkDone;
  fadeOutAnim.onfinish = checkDone;
  heightAnim.onfinish = () => {
    missionStage.style.height = `${nextHeight}px`;
    checkDone();
  };
  fadeInAnim.onfinish = checkDone;

  // Fallback timeout in case any animation is canceled or fails to fire its onfinish event
  transitionTimeout = window.setTimeout(() => {
    console.warn("View transition timed out. Forcing completion.");
    forceComplete();
  }, 950);
}

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
  if (currentTime < 2) {
    index = 0;
  } else if (currentTime < 8) {
    index = 1;
  } else if (currentTime < 14) {
    index = 2;
  } else if (currentTime < 18) {
    index = 3;
  } else if (currentTime < 23) {
    index = 4;
  } else {
    index = 5;
  }

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

function triggerVideoGlitch(hudElement, onComplete) {
  if (!hudElement) {
    if (onComplete) onComplete();
    return;
  }

  if (hudElement.glitchTimeout) {
    clearTimeout(hudElement.glitchTimeout);
  }

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

function playGlitchSound() {
  if (!soundEnabled || !audioContext) return;
  // Synthesize digital static glitch connection sounds
  for (let i = 0; i < 6; i++) {
    const freq = 150 + Math.random() * 850;
    const duration = 0.02 + Math.random() * 0.04;
    const delay = i * 0.06;
    const type = Math.random() > 0.5 ? "square" : "sawtooth";
    const volume = 0.005 + Math.random() * 0.008;
    playTone(freq, duration, delay, type, volume);
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
  playBriefingButton.disabled = true;
  playBriefingButton.textContent = "Miss J spreekt...";
  playStartSound();
  clearTimeout(storyTimeoutId);

  // Clear existing subtitles typewriter and show connecting text
  clearInterval(typewriterId);
  storyText.textContent = "Verbinding maken...";

  currentStorySlideIndex = -1;

  if (briefingVideo) {
    briefingVideo.currentTime = 0;
    briefingVideo.muted = false;
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

let missionStatusTimer = null;
function typewriteMissionStatus(text) {
  clearTimeout(missionStatusTimer);
  missionStatusTimer = null;
  missionStatus.textContent = "";
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      missionStatus.textContent += text[i];
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
  if (missionMessage) {
    missionMessage.textContent = message;
  }
}

function createAudioContext() {
  if (!soundEnabled || audioContext) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    audioContext = new AudioContext();
  }
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

function charsMatch(typedChar, targetChar) {
  return typedChar.toLowerCase() === targetChar.toLowerCase();
}

function canAcceptTyping() {
  return (testArmed || running) && !testReadyToFinish && !capsLockOn;
}

function updateMistakeCounter() {
  mistakeCountEl.textContent = mistakeCount;
}

let levelDisplayTimeout = null;
function showLevelChange(label, direction) {
  let msg = "Niveau " + label;

  typewriteMissionStatus(msg);

  clearTimeout(levelDisplayTimeout);
  levelDisplayTimeout = setTimeout(() => {
    // Restore default text if timer is not low
    const elapsed = (Date.now() - startedAt - totalPausedTime) / 1000;
    const remaining = Math.max(0, TOTAL_SECONDS - elapsed);
    if (remaining <= 10) {
      typewriteMissionStatus("Laatste seconden");
    } else {
      typewriteMissionStatus("Missie loopt");
    }
  }, 2500);
}

function getCoinScore(stats) {
  if (stats.typedChars === 0 && stats.mistakes === 0) return 0;

  const speedCoins = Math.round(stats.apm * 1.6);
  const precisionCoins = Math.round(stats.accuracy * 1.5);
  const progressCoins = Math.floor(stats.correctChars / 5);
  const mistakePenalty = stats.mistakes * 10;

  return Math.max(0, 25 + speedCoins + precisionCoins + progressCoins - mistakePenalty);
}

// Append adaptive sentences to the target text based on current rolling APM
function appendAdaptiveSentences(count) {
  const apm = getRollingApm();
  for (let i = 0; i < count; i += 1) {
    const sentence = pickSentence(apm);
    const words = sentence.split(/\s+/);
    targetWords.push(...words);
  }
  targetText = targetWords.join(" ");

  // Update difficulty label for UI
  const weights = getDifficultyWeights(apm);
  const prevLabel = currentDifficultyLabel;
  if (weights.expert > 0.3) currentDifficultyLabel = "Expert";
  else if (weights.hard > 0.3) currentDifficultyLabel = "Hard";
  else if (weights.medium > 0.3) currentDifficultyLabel = "Medium";
  else currentDifficultyLabel = "Basis";

  // Show level-up display when difficulty increases
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
  // During calibration: don't generate new sentences yet.
  // The initial probe sentence is enough. Only once calibration
  // is complete (we know the APM) do we start generating more.
  if (!calibrationComplete) {
    // Only extend if we're literally about to run out of the
    // calibration sentence (shouldn't happen, but safety net)
    if (targetText.length < typingInput.value.length + 5) {
      appendAdaptiveSentences(1);
    }
    return;
  }
  while (targetText.length < minLength) {
    appendAdaptiveSentences(1);
  }
}

function getTypedStats(elapsedSeconds) {
  const targetVisible = Math.max(INITIAL_VISIBLE_CHARS, typingInput.value.length + BUFFER_CHARS);
  ensureTargetLength(targetVisible + 40);

  const typed = typingInput.value;
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
  const typed = typingInput.value;
  const targetVisible = Math.max(INITIAL_VISIBLE_CHARS, typed.length + BUFFER_CHARS);

  // Downgrade logic: if speed drops, rewrite the hidden upcoming text
  if (calibrationComplete && running && selectedDifficulty === "dynamic") {
    const apm = getRollingApm();
    const weights = getDifficultyWeights(apm);
    let liveLabel = "Basis";
    if (weights.expert > 0.3) liveLabel = "Expert";
    else if (weights.hard > 0.3) liveLabel = "Hard";
    else if (weights.medium > 0.3) liveLabel = "Medium";

    const levels = { "Basis": 1, "Medium": 2, "Hard": 3, "Expert": 4 };
    if (levels[liveLabel] < levels[currentDifficultyLabel]) {
      // Find a safe breaking point in the hidden text just past what's visible (at sentence end)
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

  // Auto-scroll to keep current character visible
  const currentEl = promptTextEl.querySelector('.current');
  if (currentEl) {
    // OffsetTop is now accurate because .code-text is position: relative
    const elTop = currentEl.offsetTop;
    const containerTop = promptTextEl.scrollTop;
    const containerHeight = promptTextEl.clientHeight;

    // Scroll down if cursor gets close to the bottom
    if (elTop > containerTop + containerHeight - 75) {
      promptTextEl.scrollTop = elTop - 50;
    }
    // Scroll up if cursor goes above visible area
    else if (elTop < containerTop) {
      promptTextEl.scrollTop = elTop - 20;
    }
  }
}

function rejectWrongInput(typedChar) {
  if (testArmed && !running) {
    beginTimer();
  }

  mistakeCount += 1;
  mistakeIndex = typingInput.value.length;

  const targetChar = targetText[mistakeIndex];
  let mistakeType = "wrong";
  if (typedChar && targetChar && typedChar.toLowerCase() === targetChar.toLowerCase()) {
    mistakeType = "case";
  }

  if (mistakeHistory[mistakeIndex] !== "wrong") {
    mistakeHistory[mistakeIndex] = mistakeType;
  }

  updateMistakeCounter();
  renderPrompt();
  updateLiveStats();
  playKeySound(false);


  typingCard.classList.remove("input-error");
  void typingCard.offsetWidth;
  typingCard.classList.add("input-error");
}

function isAllowedInput(data) {
  ensureTargetLength(typingInput.value.length + BUFFER_CHARS);

  if (!data) {
    return false;
  }

  for (let i = 0; i < data.length; i += 1) {
    if (data[i] !== targetText[typingInput.value.length + i]) {
      return false;
    }
  }

  return true;
}

function setProgress(progress) {
  const clamped = Math.max(0, Math.min(progress, 100));
  const milestone = Math.floor(clamped / 20);

  uploadFillEl.style.width = `${clamped}%`;
  uploadPercentEl.textContent = `${Math.round(clamped)}%`;

  uploadChecks.forEach((check, index) => {
    const isActive = clamped >= (index + 1) * 20;
    if (isActive && !check.classList.contains("active")) {
      pulseElement(check);
      // Unlock corresponding bolt
      if (bolts[index]) {
        bolts[index].classList.add("unlocked");
      }
    }
    check.classList.toggle("active", isActive);
  });

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
  liveWpmEl.textContent = elapsed < 5 && running ? "—" : stats.apm;
  accuracyEl.textContent = `${stats.accuracy}%`;
  updateMistakeCounter();


}

function updateTimer() {
  if (!running || paused) return;

  const elapsed = (Date.now() - startedAt - totalPausedTime) / 1000;
  const remaining = Math.max(0, TOTAL_SECONDS - elapsed);
  const progress = (elapsed / TOTAL_SECONDS) * 100;

  timerEl.textContent = Math.ceil(remaining);
  setProgress(progress);
  updateLiveStats();

  if (remaining <= 10 && remaining > 0) {
    if (missionStatus.textContent !== "Laatste seconden" && !missionStatusTimer) {
      typewriteMissionStatus("Laatste seconden");
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
  briefingPlaying = false;
  endBriefingPlaying = false;
  clearInterval(typewriterId);
  if (briefingVideo) {
    briefingVideo.pause();
    clearVideoGlitch(briefingVideo.closest(".briefing-avatar-hud"));
  }
  if (endBriefingVideo) {
    endBriefingVideo.pause();
    clearVideoGlitch(endBriefingVideo.closest(".briefing-avatar-hud"));
  }
  const tooltip = document.getElementById("chart-tooltip");
  if (tooltip) {
    tooltip.classList.remove("visible");
  }
  paused = false;
  pauseStartTime = 0;
  totalPausedTime = 0;
  clearInterval(timerId);
  finalElapsed = TOTAL_SECONDS;
  resultStats = null;
  targetWords = [];
  wordCursor = 0;
  targetText = "";
  lastMilestone = 0;
  mistakeIndex = -1;
  mistakeCount = 0;
  mistakeHistory = {};
  currentDifficultyLabel = "Basis";
  // Skip calibration entirely when a fixed difficulty is selected
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

  // Clear adaptive tracking
  rollingWindow.length = 0;
  usedSentences.clear();

  // Build initial text: just ONE calibration sentence
  const initialText = buildInitialText();
  targetWords = initialText.split(/\s+/);
  targetText = targetWords.join(" ");
  typingInput.value = "";
  typingInput.disabled = true;

  updateOverlay();

  timerEl.textContent = TOTAL_SECONDS;
  liveWpmEl.textContent = "0";
  updateMistakeCounter();
  accuracyEl.textContent = "100%";
  setProgress(0);
  renderPrompt();

  // Reset vault visuals
  if (vaultDoor) vaultDoor.classList.remove("cracked");
  if (vaultHandle) vaultHandle.classList.remove("turned");
  if (vaultDial) vaultDial.style.transform = "rotate(0deg)";
  if (codeStatus) codeStatus.textContent = "vergrendeld";
  if (vaultWrapper) vaultWrapper.classList.remove("open");
  bolts.forEach(b => { if (b) b.classList.remove("unlocked"); });
  dialRotation = 0;

  // Clear easter egg glitch
  isGlitchFrozen = false;
  handlePullCount = 0;
  const statusScreen = document.querySelector("#vaultStatusScreen");
  if (statusScreen) statusScreen.classList.remove("glitch-effect");
  if (handleSlider) {
    handleSlider.style.transition = '';
    handleSlider.style.transform = '';
  }
  if (missionStatus) {
    missionStatus.style.color = "";
    missionStatus.style.textShadow = "";
  }

  const dialLockIcon = document.querySelector(".dial-center svg");
  if (dialLockIcon) {
    dialLockIcon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
  }

  // Re-enable difficulty dropdown
  if (difficultyDropdown) difficultyDropdown.classList.remove("disabled");

  startButton.hidden = false;
  startButton.disabled = false;
  startButton.innerHTML = onboardingComplete
    ? '<span aria-hidden="true">&#9658;</span> Klaar voor de start'
    : '<span aria-hidden="true">&#9658;</span> Bekijk briefing';
  finishButton.hidden = true;
  finishButton.disabled = true;
  if (activeMissionView !== resultPanel) {
    resultPanel.hidden = true;
    resultPanel.classList.remove("active");
  }
  if (ctaFeedback) {
    ctaFeedback.textContent = "";
  }
  setMissionStep(onboardingComplete ? "ready" : "briefing");
  setMissionCopy(
    onboardingComplete ? "Wacht op start" : "Briefing nodig",
    onboardingComplete
      ? "Briefing voltooid. Klik op start en begin wanneer je klaar bent. De timer loopt pas vanaf je eerste letter."
      : "Miss J opent zo de briefing. Na haar instructie wordt de typetest vrijgegeven."
  );
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
  typingInput.disabled = false;
  updateOverlay();
  if (codeStatus) codeStatus.textContent = "ontgrendeld";

  startButton.disabled = true;
  startButton.innerHTML = '<span aria-hidden="true">&#9201;</span> Klaar voor de start';
  setMissionStep("typing");
  setMissionCopy(
    "Klaar voor de start",
    "De timer blijft op 60 seconden staan tot je eerste letter is getypt."
  );
  playStartSound();
  renderPrompt();

  const codePanel = document.querySelector("#vaultCodePanel");
  if (codePanel) {
    codePanel.animate([
      { transform: "translateY(12px)" },
      { transform: "translateY(0)" }
    ], {
      duration: 350,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    });
  }

  typingInput.focus();
}

function beginTimer() {
  if (running || !testArmed || testReadyToFinish) return;

  running = true;
  testArmed = false;
  startedAt = Date.now();
  finalElapsed = 0;
  startButton.innerHTML = '<span aria-hidden="true">&#9632;</span> Missie loopt';

  // Disable difficulty dropdown visually
  if (difficultyDropdown) difficultyDropdown.classList.add("disabled");

  typewriteMissionStatus("Missie loopt");

  timerId = window.setInterval(updateTimer, 100);
  updateTimer();
}

function completeTimedTest() {
  if (!running) return;

  running = false;
  testArmed = false;
  clearInterval(timerId);
  finalElapsed = TOTAL_SECONDS;
  timerEl.textContent = "0";
  setProgress(100);
  updateLiveStats();
  typingInput.disabled = true;
  testFinished = true;

  // Hide typing overlay during animation so vault is visible
  updateOverlay();

  resultStats = getTypedStats(TOTAL_SECONDS);
  startButton.hidden = true;
  startButton.disabled = true;
  setMissionStep("typing");

  // === Vault cracking sequence (fast) ===
  if (codeStatus) codeStatus.textContent = "kraken...";

  // Step 1: Dial spins (0ms)
  if (vaultDial) {
    const targetRotation = Math.ceil(dialRotation / 90) * 90 + 720;
    const currentRotation = dialRotation;
    dialRotation = targetRotation; // Update internal state so it doesn't snap back improperly

    vaultDial.animate([
      { transform: `rotate(${currentRotation}deg)` },
      { transform: `rotate(${targetRotation}deg)` }
    ], {
      duration: 1200,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      fill: "forwards"
    });
    // Ensure the rotation remains set after animation
    setTimeout(() => {
      vaultDial.style.transform = `rotate(${targetRotation}deg)`;
    }, 1200);
  }

  // Step 2: Handle turns down & vault cracked (1200ms)
  setTimeout(() => {
    if (vaultHandle) vaultHandle.classList.add("turned");
    if (vaultDoor) vaultDoor.classList.add("cracked");
    if (codeStatus) codeStatus.textContent = "gekraakt!";
    playTone(600, 0.1, 0, "triangle", 0.025);
    playFinishSound();

    // Open lock icon in center of dial
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

  // Step 3: Show "Bekijk uitslag" button — user clicks to see results
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

  // Clear existing subtitles typewriter and show connecting text
  clearInterval(typewriterId);
  endBriefingText.textContent = "Verbinding maken...";

  currentEndStorySlideIndex = -1;

  if (endBriefingVideo) {
    endBriefingVideo.currentTime = 0;
    endBriefingVideo.muted = false;
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
  if (currentTime < 3) {
    index = 0;
  } else if (currentTime < 6) {
    index = 1;
  } else if (currentTime < 11) {
    index = 2;
  } else if (currentTime < 14) {
    index = 3;
  } else if (currentTime < 18) {
    index = 4;
  } else if (currentTime < 26) {
    index = 5;
  } else {
    index = 6;
  }

  if (index !== currentEndStorySlideIndex) {
    currentEndStorySlideIndex = index;
    playEndBriefingSlide(index);
  }
}

function playEndBriefingSlide(index = 0) {
  const isFinalSlide = index >= endStorySlides.length - 1;

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

  const mistakeLabel = stats.mistakes === 1 ? "1 fout" : `${stats.mistakes} fouten`;

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

  resultTitle.textContent = stats.apm >= 120 ? "Kluis gekraakt, superspion!" : (stats.coins >= 260 ? "Kluis gekraakt, rekruut!" : "Missie voltooid, rekruut");
  resultText.textContent = resultIntro;
  startButton.disabled = false;
  startButton.innerHTML = '<span aria-hidden="true">&#9658;</span> Nog een poging';
  setMissionStep("result");
  setMissionCopy(
    "Missie voltooid",
    `Je haalde ${stats.apm} APM en ${stats.coins} Super Spy School coins.`
  );
  testReadyToFinish = false;
  showInlineComplete(stats);

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

    // Run custom count-up animations for statistics
    animateValue(completeCoins, 0, stats.coins, 1200);
    animateValue(completeWpm, 0, stats.apm, 1200);
    animateValue(completeAccuracy, 0, stats.accuracy, 1200, "%");
    animateValue(completeMistakes, 0, stats.mistakes, 1200);

    // Render the animated speed and accuracy charts
    renderResultCharts(stats.apm, stats.accuracy);

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

function renderResultCharts(apm, accuracy) {
  const apmContainer = document.querySelector("#apmChartContainer");
  const accuracyContainer = document.querySelector("#accuracyChartContainer");

  if (!apmContainer || !accuracyContainer) return;

  apmContainer.innerHTML = "";
  accuracyContainer.innerHTML = "";

  // 1. Calculate APM layout coordinates
  const userApmX = getApmX(apm);
  const userApmY = getApmY(userApmX);
  const apmTargetX = 230;
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

      <!-- Full Background Path (Solid connecting line) -->
      <path d="${generateCurvePath(30, 550)}" fill="none" stroke="var(--line)" stroke-width="5" stroke-linecap="round" />

      <!-- Target lines (dotted vertical) -->
      <line x1="${apmTargetX}" y1="${apmTargetY}" x2="${apmTargetX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />
      <line x1="${apmAverageX}" y1="${apmAverageY}" x2="${apmAverageX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />
      <line x1="${apmWrX}" y1="${apmWrY}" x2="${apmWrX}" y2="150" stroke="rgba(59, 7, 51, 0.35)" stroke-dasharray="3,3" />

      <!-- User Pin vertical line -->
      <line x1="${userApmX}" y1="150" x2="${userApmX}" y2="${userApmY}" class="chart-user-line" stroke="var(--blue)" stroke-width="2" stroke-dasharray="3,3" opacity="0" />

      <!-- Colored Progress Path -->
      <path d="${generateCurvePath(30, userApmX)}" fill="none" stroke="url(#apmGlowGrad)" stroke-width="6" stroke-linecap="round" class="chart-progress-path" filter="url(#apmShadow)" />

      <!-- Benchmark Nodes -->
      <!-- Diploma Node -->
      <g class="chart-node-group" data-tooltip="Diploma: De minimale snelheid die je behaalt na de TypeMission-cursus (120 APM).">
        <circle cx="${apmTargetX}" cy="${apmTargetY}" r="7" fill="var(--paper)" stroke="var(--orange)" stroke-width="3.5" />
        <circle cx="${apmTargetX}" cy="${apmTargetY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${apmTargetX}" y="${apmTargetY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Diploma</text>
        <text x="${apmTargetX}" y="172" text-anchor="middle" class="chart-axis-label-main">120</text>
        <text x="${apmTargetX}" y="188" text-anchor="middle" class="chart-axis-label-sub">APM</text>
      </g>

      <!-- Average Node -->
      <g class="chart-node-group" data-tooltip="Gemiddelde: De gemiddelde snelheid van geslaagde cursisten (167 APM).">
        <circle cx="${apmAverageX}" cy="${apmAverageY}" r="7" fill="var(--paper)" stroke="var(--blue)" stroke-width="3.5" />
        <circle cx="${apmAverageX}" cy="${apmAverageY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${apmAverageX}" y="${apmAverageY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Gemiddelde</text>
        <text x="${apmAverageX}" y="172" text-anchor="middle" class="chart-axis-label-main">167</text>
        <text x="${apmAverageX}" y="188" text-anchor="middle" class="chart-axis-label-sub">APM</text>
      </g>

      <!-- World Record Node -->
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
        
        <!-- User Badge -->
        <g transform="translate(0, -6)">
          <rect x="${userApmX - 60}" y="${userApmY - 42}" width="120" height="30" rx="6" fill="var(--purple)" />
          <polygon points="${userApmX - 5},${userApmY - 12} ${userApmX + 5},${userApmY - 12} ${userApmX},${userApmY - 5}" fill="var(--purple)" />
          <text x="${userApmX}" y="${userApmY - 22}" text-anchor="middle" font-size="15" font-family="Orbitron" fill="var(--paper)" font-weight="700">${apm} APM</text>
        </g>
      </g>
    </svg>
  `;

  // 3. Calculate Accuracy layout coordinates
  const userAccX = getAccX(accuracy);
  const userAccY = getApmY(userAccX);
  const accTargetX = 230;
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

      <!-- Full Background Path (Solid connecting line) -->
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
      <!-- Diploma Node -->
      <g class="chart-node-group" data-tooltip="Diploma: De minimale precisie die vereist is om te slagen (97%).">
        <circle cx="${accTargetX}" cy="${accTargetY}" r="7" fill="var(--paper)" stroke="var(--orange)" stroke-width="3.5" />
        <circle cx="${accTargetX}" cy="${accTargetY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${accTargetX}" y="${accTargetY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Diploma</text>
        <text x="${accTargetX}" y="172" text-anchor="middle" class="chart-axis-label-main">97%</text>
        <text x="${accTargetX}" y="188" text-anchor="middle" class="chart-axis-label-sub">Precisie</text>
      </g>

      <!-- Average Node -->
      <g class="chart-node-group" data-tooltip="Gemiddelde: De gemiddelde precisie van geslaagde cursisten (99%).">
        <circle cx="${accAverageX}" cy="${accAverageY}" r="7" fill="var(--paper)" stroke="var(--blue)" stroke-width="3.5" />
        <circle cx="${accAverageX}" cy="${accAverageY}" r="22" fill="transparent" class="node-hover-hitbox" style="cursor: pointer;" />
        <text x="${accAverageX}" y="${accAverageY + 22}" text-anchor="middle" class="chart-node-label" fill="var(--purple)">Gemiddelde</text>
        <text x="${accAverageX}" y="172" text-anchor="middle" class="chart-axis-label-main">99%</text>
        <text x="${accAverageX}" y="188" text-anchor="middle" class="chart-axis-label-sub">Precisie</text>
      </g>

      <!-- Perfect Node -->
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
        
        <!-- User Badge -->
        <g transform="translate(0, -6)">
          <rect x="${userAccX - 60}" y="${userAccY - 42}" width="120" height="30" rx="6" fill="var(--purple)" />
          <polygon points="${userAccX - 5},${userAccY - 12} ${userAccX + 5},${userAccY - 12} ${userAccX},${userAccY - 5}" fill="var(--purple)" />
          <text x="${userAccX}" y="${userAccY - 22}" text-anchor="middle" font-size="15" font-family="Orbitron" fill="var(--paper)" font-weight="700">${accuracy}%</text>
        </g>
      </g>
    </svg>
  `;

  apmContainer.innerHTML = apmSvg;
  accuracyContainer.innerHTML = accuracySvg;

  // Setup hover tooltips for benchmark nodes
  setupChartTooltips();

  // 5. Trigger CSS transitions for drawing paths and fading pins
  setTimeout(() => {
    document.querySelectorAll(".spy-svg-chart").forEach(svg => {
      // Find the animated paths
      const path = svg.querySelector(".chart-progress-path");
      if (path) {
        const length = path.getTotalLength();
        // Setup line style
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        // Force reflow
        path.getBoundingClientRect();
        
        // Trigger draw animation
        path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        path.style.strokeDashoffset = "0";
      }

      // After path finishes drawing, fade in user node and line
      setTimeout(() => {
        const userLine = svg.querySelector(".chart-user-line");
        const userNode = svg.querySelector(".chart-user-node");
        if (userLine) {
          userLine.style.transition = "opacity 0.6s ease";
          userLine.style.opacity = "1";
        }
        if (userNode) {
          userNode.style.transition = "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
          userNode.style.opacity = "1";
        }
      }, 1500);
    });
  }, 100);
}

function setupChartTooltips() {
  let tooltip = document.getElementById("chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "chart-tooltip";
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);
  }

  const nodes = document.querySelectorAll(".chart-node-group");
  nodes.forEach(node => {
    node.addEventListener("mouseenter", () => {
      const text = node.getAttribute("data-tooltip");
      if (!text) return;
      tooltip.textContent = text;
      tooltip.classList.add("visible");
      
      const rect = node.getBoundingClientRect();
      const tooltipX = rect.left + window.scrollX + rect.width / 2;
      const tooltipY = rect.top + window.scrollY - 10;
      
      tooltip.style.left = `${tooltipX}px`;
      tooltip.style.top = `${tooltipY}px`;
    });

    node.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });
  });
}

// Coordinate Helpers for speed (APM)
function getApmX(val) {
  if (val <= 120) {
    return 30 + (Math.max(0, val) / 120) * 200;
  } else if (val <= 167) {
    return 230 + ((val - 120) / (167 - 120)) * 140;
  } else {
    return 370 + (Math.min(800, val - 167) / (800 - 167)) * 180;
  }
}

// Coordinate Helpers for accuracy (Netheid)
function getAccX(val) {
  const minAcc = 75; // Clamped at 75% visually
  if (val <= 97) {
    const pct = Math.max(0, (val - minAcc) / (97 - minAcc));
    return 30 + pct * 200;
  } else if (val <= 99) {
    return 230 + ((val - 97) / (99 - 97)) * 140;
  } else {
    return 370 + ((val - 99) / (100 - 99)) * 180;
  }
}

// Coordinate Helper for Y coordinate along easeOutQuad curve
function getApmY(x) {
  const t = (x - 30) / 520;
  return 150 - (t * (2 - t)) * 125;
}

// Helper to generate coordinates path dynamically
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

function animateValue(element, start, end, duration, suffix = "") {
  if (!element) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Cubic ease-out curve
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(easeProgress * (end - start) + start);
    element.textContent = currentValue + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

typingInput.addEventListener("input", () => {
  if (!canAcceptTyping()) return;
  if (!running) {
    beginTimer();
  }

  // Track keystroke for rolling APM (adaptive difficulty)
  recordKeystroke();

  // Check if calibration is complete (enough chars to determine level)
  const wasCalibrated = calibrationComplete;
  checkCalibration();

  // If calibration just completed, immediately generate sentences
  // at the detected difficulty level
  if (!wasCalibrated && calibrationComplete) {
    if (selectedDifficulty === "dynamic") {
      // Truncate the pre-loaded easy text right after the current typing
      // position at the first sentence boundary. This ensures the very
      // first dynamically generated sentence matches the detected level,
      // instead of leaving easy sentences queued in the buffer.
      const typedLen = typingInput.value.length;
      const searchFrom = typedLen; // start looking from where the user is now
      const afterTyped = targetText.substring(searchFrom);
      const match = afterTyped.match(/[.?!]["']?\s/);
      if (match) {
        const breakPoint = searchFrom + match.index + match[0].length;
        targetText = targetText.slice(0, breakPoint).trimEnd();
        targetWords = targetText.split(/\s+/).filter(w => w);
      }
      // Force append new sentences based on real APM
      appendAdaptiveSentences(2);

      // Show the newly detected level
      showLevelChange(currentDifficultyLabel, "up");
    }
  }

  const typed = typingInput.value;
  const lastIndex = typed.length - 1;
  const isCorrect = lastIndex < 0 || charsMatch(typed[lastIndex], targetText[lastIndex]);

  mistakeIndex = -1;
  const finalTargetVisible = Math.max(INITIAL_VISIBLE_CHARS, typed.length + BUFFER_CHARS);
  ensureTargetLength(finalTargetVisible + 40);
  renderPrompt();
  updateLiveStats();
  playKeySound(isCorrect);

  if (isCorrect && typed[lastIndex] === ' ') {
    dialRotation += 15;
    if (vaultDial) {
      // Hard mechanical tick: snap past target then recoil back, like a clock second hand
      vaultDial.animate([
        { transform: `rotate(${dialRotation - 15}deg)` },
        { transform: `rotate(${dialRotation + 4}deg)`, offset: 0.43 },
        { transform: `rotate(${dialRotation}deg)` }
      ], {
        duration: 140,
        easing: "ease-out",
        fill: "forwards"
      });
      // Make sure the inline style stays at dialRotation
      vaultDial.style.transform = `rotate(${dialRotation}deg)`;
    }
  }
});

const codeContainer = document.querySelector(".screen-body");
if (codeContainer) {
  codeContainer.addEventListener("click", () => {
    if (testReadyToFinish) {
      showResults();
      return;
    }
    if (!typingInput.disabled) {
      typingInput.focus();
    }
  });
}

typingInput.addEventListener("beforeinput", (event) => {
  if (!canAcceptTyping()) return;

  if (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") {
    mistakeIndex = -1;
    return;
  }

  if (event.inputType === "insertFromPaste" || !isAllowedInput(event.data)) {
    if (!running) {
      beginTimer();
    }
    event.preventDefault();
    rejectWrongInput(event.data);
    return;
  }

  if (event.inputType.startsWith("insert") && event.data && !running) {
    beginTimer();
  }
});

typingInput.addEventListener("keydown", (event) => {
  if (!canAcceptTyping() || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key.length !== 1) return;

  if (!running) {
    beginTimer();
  }

  if (!isAllowedInput(event.key)) {
    event.preventDefault();
    rejectWrongInput(event.key);
  }
});

typingCard.addEventListener("click", () => {
  if (testArmed || running) {
    typingInput.focus();
  } else if (onboardingComplete && !testReadyToFinish) {
    startTest();
  }
});

startButton.addEventListener("click", startTest);
finishButton.addEventListener("click", showResults);
resetButton.addEventListener("click", resetTest);
retryResultButton.addEventListener("click", () => {
  resetTest();
  transitionToView(missionLayout, () => {
    startButton.focus();
  });
});

playBriefingButton.addEventListener("click", startBriefing);
beginMissionButton.addEventListener("click", () => completeOnboarding({ startImmediately: true }));

if (briefingVideo) {
  briefingVideo.addEventListener("timeupdate", () => {
    if (briefingPlaying) {
      updateSubtitles(briefingVideo.currentTime);
    }
  });
  briefingVideo.addEventListener("ended", () => {
    if (briefingPlaying) {
      completeOnboarding();
    }
  });
}

if (skipEndBriefingButton) {
  skipEndBriefingButton.addEventListener("click", completeEndBriefing);
}

if (endBriefingVideo) {
  endBriefingVideo.addEventListener("timeupdate", () => {
    if (endBriefingPlaying) {
      updateEndSubtitles(endBriefingVideo.currentTime);
    }
  });
  endBriefingVideo.addEventListener("ended", () => {
    if (endBriefingPlaying) {
      completeEndBriefing();
    }
  });
}

startMissionHero.addEventListener("click", (event) => {
  if (!onboardingComplete) {
    event.preventDefault();
    guideToBriefing();
  }
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle.setAttribute("aria-label", soundEnabled ? "Geluid aan" : "Geluid uit");
  soundToggle.innerHTML = soundEnabled
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
  if (soundEnabled) {
    createAudioContext();
    playTone(520, 0.06, 0, "triangle");
  }
});

trialButton.addEventListener("click", () => {
  if (ctaFeedback) {
    ctaFeedback.textContent = "Top! Mr. I zet jouw eerste geheime missie klaar.";
  }
});

buyButton.addEventListener("click", () => {
  if (ctaFeedback) {
    ctaFeedback.textContent = "Cursus gekozen. De SuperSpySchool opent het dossier.";
  }
});

function decryptCoupon(element, targetCode) {
  if (element.classList.contains("decrypting") || element.classList.contains("decrypted")) return;

  // Lock current width so button size doesn't change/shrink during decryption
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

const couponEl = document.querySelector("#couponCode");
if (couponEl) {
  couponEl.addEventListener("click", () => {
    if (couponEl.classList.contains("locked")) {
      decryptCoupon(couponEl, "typtest15");
    } else if (couponEl.classList.contains("decrypted")) {
      navigator.clipboard.writeText(couponEl.textContent.trim()).then(() => {
        const originalText = couponEl.textContent;
        couponEl.textContent = "GEKOPIEERD!";
        couponEl.classList.add("copied");

        setTimeout(() => {
          couponEl.textContent = originalText;
          couponEl.classList.remove("copied");
        }, 1500);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (canAcceptTyping() && document.activeElement !== typingInput) {
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      typingInput.focus();
      return;
    }
  }

  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
  }
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
  if (testFinished || activeMissionView === resultPanel) {
    typingOverlay.classList.add("hidden");
    typingOverlay.classList.remove("caps-lock-warning");
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

    typingOverlay.classList.remove("hidden");
    typingOverlay.classList.add("caps-lock-warning");
    overlayMessage.innerHTML = "<strong>Caps Lock staat aan.</strong><br>Zet dit uit om verder te typen.";
    const icon = typingOverlay.querySelector(".overlay-icon");
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

  typingOverlay.classList.remove("caps-lock-warning");
  if (running || testArmed) {
    typingOverlay.classList.add("hidden");
  } else {
    typingOverlay.classList.remove("hidden");
    if (onboardingComplete) {
      overlayMessage.innerHTML = "Klik op <strong>Start de test</strong> om te beginnen.";
      const icon = typingOverlay.querySelector(".overlay-icon");
      if (icon) icon.innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
    } else {
      overlayMessage.innerHTML = "Wacht op briefing...";
    }
  }
}

function handleCapsLock(isOn) {
  if (capsLockOn === isOn) return;
  capsLockOn = isOn;
  updateOverlay();
}

window.addEventListener("keydown", (event) => {
  if (event.getModifierState) handleCapsLock(event.getModifierState("CapsLock"));
});
window.addEventListener("keyup", (event) => {
  if (event.getModifierState) handleCapsLock(event.getModifierState("CapsLock"));
});

runIntroAnimations();

// --- Vault Handle Drag Interaction ---
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
    if (running || testFinished) return;
    isDraggingHandle = true;
    startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    currentY = 0;

    if (!isGlitchFrozen && missionStatus.textContent !== "ACCESS DENIED") {
      originalStatusText = missionStatus.textContent;
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

    if (currentY >= maxDrag * 0.8) {
      if (!isGlitchFrozen) {
        if (missionStatus.textContent !== "ACCESS DENIED") {
          missionStatus.textContent = "ACCESS DENIED";
          missionStatus.style.color = "#e85d75";
          missionStatus.style.textShadow = "0 0 8px rgba(232, 93, 117, 0.5)";
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

        missionStatus.textContent = originalStatusText;
        missionStatus.style.color = "";
        missionStatus.style.textShadow = "";
      }

      if (!isGlitchFrozen && missionStatus.textContent === "ACCESS DENIED") {
        missionStatus.textContent = originalStatusText;
        missionStatus.style.color = "";
        missionStatus.style.textShadow = "";
      }
    }
  };

  const stopDrag = () => {
    if (!isDraggingHandle) return;
    isDraggingHandle = false;
    document.body.classList.remove('is-dragging-handle');

    if (isGlitchFrozen) {
      handleSlider.style.transition = 'transform 0.2s';
      handleSlider.style.transform = `translate(-50%, ${maxDrag}px)`;
    } else {
      handleSlider.style.transition = '';
      handleSlider.style.transform = '';

      if (missionStatus.textContent === "ACCESS DENIED") {
        missionStatus.textContent = originalStatusText;
        missionStatus.style.color = "";
        missionStatus.style.textShadow = "";
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

resetTest();

