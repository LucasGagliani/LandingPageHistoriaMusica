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

const initHeroAnimation = () => {
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroText = document.querySelector(".hero-text");
    const heroScrollCue = document.querySelector(".scroll-cue");
    const heroVisual = document.querySelector(".hero-visual");
    const heroSection = document.querySelector(".hero");

    if (
        !heroTitle ||
        !heroSubtitle ||
        !heroText ||
        !heroScrollCue ||
        !heroVisual ||
        !heroSection ||
        !window.gsap ||
        !window.ScrollTrigger ||
        !window.SplitType
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    new SplitType(heroTitle, {
        types: "words",
        tagName: "span"
    });

    const titleWords = heroTitle.querySelectorAll(".word");

    gsap.set(heroTitle, {
        opacity: 1
    });

    gsap.set(titleWords, {
        yPercent: 105,
        opacity: 0
    });

    gsap.set([heroSubtitle, heroText, heroScrollCue], {
       
        opacity: 0
    });

    gsap.set(heroVisual, {
        xPercent: 2,
        yPercent: 1,
        opacity: 0.96
    });

    const introTimeline = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power3.out"
        }
    });

    introTimeline
        .to(titleWords, {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.055
        })
        .to(heroSubtitle, {
            y: 0,
            opacity: 1,
            duration: 0.8
        }, "-=0.55")
        .to(heroText, {
            y: 0,
            opacity: 1,
            duration: 0.8
        }, "-=0.62")
        .to(heroScrollCue, {
            y: 0,
            opacity: 1,
            duration: 0.7
        }, "-=0.56")
        .to(heroVisual, {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power2.out"
        }, 0);

    const heroScrollTimeline = gsap.timeline({
        defaults: {
            ease: "none"
        },
        scrollTrigger: {
            trigger: heroSection,
            start: "top+=96 top",
            end: "bottom top",
            scrub: 1.15
        }
    });

    heroScrollTimeline
        .fromTo(heroTitle, {
            yPercent: 0
        }, {
            yPercent: -4,
            immediateRender: false
        }, 0)
        .fromTo([heroSubtitle, heroText], {
            y: 0
        }, {
            y: -6,
            stagger: 0.04,
            immediateRender: false
        }, 0)
        .fromTo(heroScrollCue, {
            y: 0,
            opacity: 1
        }, {
            y: -10,
            opacity: 0.5,
            immediateRender: false
        }, 0)
        .fromTo(heroVisual, {
            yPercent: 0,
            rotate: 0
        }, {
            yPercent: 2.5,
            rotate: -0.75,
            immediateRender: false
        }, 0);

    requestAnimationFrame(() => {
        introTimeline.play(0);
        ScrollTrigger.refresh();
    });
};

initHeroAnimation();
