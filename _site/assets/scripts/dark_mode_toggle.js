function calculateSettingAsThemeString({ localStorageTheme }) {
    console.log(localStorageTheme);
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    const possible_settings = ["dark", "dark_dimmed", "light", "light_high_contrast"];

    possible_settings.forEach((s) => {
        if (window.matchMedia(`(prefers-color-scheme: ${s})`)) {
            console.log(`Prefers color scheme: ${s}`);
            return s;
        } else {
            console.log(`Does not Prefers color scheme: ${s}`);
        }
    })
    // if (systemSettingDark.matches) {
    //     return "dark_dimmed";
    // }

    return "auto";
}

function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-color-mode", theme);
}

const dm_switch = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
if (localStorageTheme === "dark") {
    dm_switch.innerHTML = `<span class="label">Light Mode</span>`;
} else {
    dm_switch.innerHTML = `<span class="label">Dark Mode</span>`;
}

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

dm_switch.addEventListener("click", (event) => {
    console.log("Clicked");
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    console.log(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeOnHtmlEl({ theme: newTheme});
    currentThemeSetting = newTheme;
    if (newTheme === "dark") {
        dm_switch.innerHTML = `<span class="label">Light Mode</span>`;
    } else {
        dm_switch.innerHTML = `<span class="label">Dark Mode</span>`;
    }
});
