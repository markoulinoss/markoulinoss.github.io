const THEMES = ["amber", "green", "paper"];
const THEME_KEY = "phosphor";

const root = document.documentElement;
const page = document.getElementById("page");
const shell = document.getElementById("shell");
const status = document.getElementById("status");
const position = document.getElementById("position");
const help = document.getElementById("help");
const themeButton = document.getElementById("theme-button");
const sections = [...document.querySelectorAll("main section")];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function applyTheme(theme, remember) {
  root.dataset.theme = theme;
  themeButton.textContent = theme;
  if (!remember) return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked; the theme just won't persist.
  }
}

function nextTheme() {
  const next = THEMES[(THEMES.indexOf(root.dataset.theme) + 1) % THEMES.length];
  applyTheme(next, true);
}

function isAtEnd() {
  return window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 2;
}

function currentSectionIndex() {
  if (isAtEnd()) return sections.length - 1;
  let current = 0;
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.25) current = index;
  });
  return current;
}

function updatePosition() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100;
  const name = sections[currentSectionIndex()].querySelector("h2").textContent;
  position.textContent = `${name} ${isAtEnd() ? "(END)" : `${percent}%`}`;
}

function typeCommand() {
  const command = document.getElementById("command");
  if (reducedMotion) return;
  const text = command.textContent;
  let typed = 0;
  command.textContent = "";
  const timer = setInterval(() => {
    typed += 1;
    command.textContent = text.slice(0, typed);
    if (typed === text.length) clearInterval(timer);
  }, 45);
}

function quit() {
  page.hidden = true;
  status.hidden = true;
  shell.hidden = false;
  document.getElementById("reopen").focus();
}

function reopen() {
  shell.hidden = true;
  page.hidden = false;
  status.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
  updatePosition();
}

function jumpSection(step) {
  const target = sections[currentSectionIndex() + step];
  if (target) target.scrollIntoView({ behavior: "instant" });
}

function scrollByLines(lines) {
  const lineHeight = parseFloat(getComputedStyle(document.body).lineHeight);
  window.scrollBy({ top: lines * lineHeight, behavior: "instant" });
}

const KEYS = {
  j: () => scrollByLines(1),
  k: () => scrollByLines(-1),
  d: () => window.scrollBy({ top: window.innerHeight / 2, behavior: "instant" }),
  u: () => window.scrollBy({ top: -window.innerHeight / 2, behavior: "instant" }),
  g: () => window.scrollTo({ top: 0, behavior: "instant" }),
  G: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
  n: () => jumpSection(1),
  p: () => jumpSection(-1),
  t: nextTheme,
  q: quit,
  h: () => help.showModal(),
};

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey || help.open || !shell.hidden) return;
  const action = KEYS[event.key];
  if (action) action();
});

themeButton.addEventListener("click", nextTheme);
document.getElementById("help-button").addEventListener("click", () => help.showModal());
document.getElementById("reopen").addEventListener("click", reopen);
window.addEventListener("scroll", updatePosition, { passive: true });
window.addEventListener("resize", updatePosition);

const storedTheme = readStoredTheme();
applyTheme(THEMES.includes(storedTheme) ? storedTheme : "amber", false);
status.hidden = false;
updatePosition();
typeCommand();
