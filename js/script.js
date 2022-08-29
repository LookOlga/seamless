'use strict';

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('isLoaded');
    }, 700);
})


const mqDark = window.matchMedia("(prefers-color-scheme: dark)"),
    darkModeToggle = document.querySelector('.dark-mode-toggle'),
    darkModeToggleText = darkModeToggle.querySelector('span'),
    menuToggle = document.querySelector('.menu-toggle'),
    menuToggleText = menuToggle.querySelector('span'),
    header = document.querySelector('.header');


const bodyTag = document.querySelector('body');

menuToggle.addEventListener('click', () => {
    bodyTag.classList.toggle('menu-open');

    if (bodyTag.classList.contains("menu-open")) {
        menuToggleText.textContent = "Close";
        header.classList.remove('is-scrolled');

        gsap.to(".burger-top", {
            rotation: 45,
            transformOrigin: "50% 50%",
            y: 8
        });
        gsap.to(".burger-bottom", {
            rotation: -45,
            transformOrigin: "50% 50%",
            y: -8
        });
        gsap.to(".burger-middle", {
            width: 0
        });

    } else {
        menuToggleText.textContent = "Menu";

        gsap.to(".burger-top", {
            rotation: 0,
            y: 0
        });
        gsap.to(".burger-bottom", {
            rotation: 0,
            y: 0
        });
        gsap.to(".burger-middle", {
            width: 28
        });

        if (window.pageYOffset > 0 && window.innerWidth < 1024) {
            header.classList.add('is-scrolled');
        }
    }
})


darkModeToggle.addEventListener('click', () => {
    console.log('!!')
    if (bodyTag.classList.contains("dark-mode")) {
        darkModeToggleText.textContent = "Light Mode";

        gsap.to(".toggle", {
            x: 43
        });
    } else {
        darkModeToggleText.textContent = "Dark Mode";

        gsap.to(".toggle", {
            x: 19
        });
    }

    const timeline = gsap.timeline();

    timeline
        .set(".wipe", {
            height: "0%",
            top: "0%"
        })
        .to(".wipe", {
            height: "100%",
            duration: 1
        })
        .add(() => {
            bodyTag.classList.toggle("dark-mode");
        })
        .to(".wipe", {
            height: "0%",
            top: "100%",
            duration: 1
        })
})

const updateDarkMode = () => {
    if (mqDark.matches) {
        bodyTag.classList.add("dark-mode");
        darkModeToggleText.textContent = "Light Mode";

        gsap.to(".toggle", {
            x: 43
        });
    } else {
        bodyTag.classList.remove("dark-mode");
        darkModeToggleText.textContent = "Dark Mode";

        gsap.to(".toggle", {
            x: 19
        });
    }
}

updateDarkMode();
mqDark.addListener(() => {
    updateDarkMode();
})

const spiralTimeline = gsap.timeline({
    repeat: -1
})

spiralTimeline
    .set(".spiral rect", {
        rotation: 0,
        transformOrigin: "50% 50%"
    })
    .set(".spiral rect:nth-child(1)", {
        rotation: 15,
    })
    .set(".spiral rect:nth-child(3)", {
        rotation: -15,
    })
    .to(".spiral rect", {
        rotation: "+=90",
        transformOrigin: "50% 50%",
        duration: 4,
        stagger: -0.25
    })



window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0 && window.innerWidth < 1024) {
        header.classList.add('is-scrolled');
        darkModeToggle.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
        darkModeToggle.classList.remove('is-scrolled');
    }
})