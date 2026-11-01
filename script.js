const THEME_KEY = "theme";

const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

function labelToggle() {
  const other = root.dataset.theme === "dark" ? "light" : "dark";
  toggle.setAttribute("aria-label", `Switch to ${other} mode`);
}

toggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  labelToggle();
  try {
    localStorage.setItem(THEME_KEY, root.dataset.theme);
  } catch {
    // Storage can be blocked; the theme just won't persist.
  }
});

labelToggle();
