const html = document.documentElement;
const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
const colorToggle = document.querySelector("#color-switch-toggle");

colorToggle.addEventListener("click",  (e) => {
    console.log("CLICKED!");
    const currentColorScheme = html.getAttribute("data-theme") || "light";
    const newColorScheme = currentColorScheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newColorScheme);
    document.documentElement.style.colorScheme = newColorScheme;
    metaColorScheme.setAttribute("content", newColorScheme);
})