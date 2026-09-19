const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const themeBtn = document.getElementById("themeBtn");
const progress = document.getElementById("progress");
const year = document.getElementById("year");

// ===============================
// MOBILE MENU
// ===============================

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll("#nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


// ===============================
// DARK / LIGHT THEME
// ===============================

if (themeBtn) {

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeBtn.textContent = "☾";
    } else {
        themeBtn.textContent = "☼";
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        themeBtn.textContent =
            isLight ? "☾" : "☼";
    });
}


// ===============================
// CURRENT YEAR
// ===============================

if (year) {
    year.textContent = new Date().getFullYear();
}


// ===============================
// SCROLL PROGRESS
// ===============================

window.addEventListener("scroll", () => {

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollTop =
        document.documentElement.scrollTop;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (progress) {
        progress.style.width = percentage + "%";
    }
});


// ===============================
// SCROLL REVEAL
// ===============================

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});
