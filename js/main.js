const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  const isDark = root.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
