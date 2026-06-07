const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, {
    threshold: 0.18,
    rootMargin: "0px 0px -70px 0px"
});

document.querySelectorAll(".story-panel").forEach((panel) => {
    revealObserver.observe(panel);
});

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-icon");
const menuNav = document.querySelector(".header-nav");

const closeMenu = () => {
    if (!header || !menuButton) {
        return;
    }

    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
};

if (header && menuButton && menuNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = header.classList.toggle("menu-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    menuNav.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!header.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
