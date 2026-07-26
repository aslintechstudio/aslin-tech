document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".mobile-menu-button");
    const navigation = document.querySelector(".navigation");
    const navigationLinks = document.querySelectorAll(".navigation a");
    const revealElements = document.querySelectorAll(".reveal");
    const currentYear = document.querySelector("#current-year");
    const hero = document.querySelector(".hero");
    const faqItems = Array.from(document.querySelectorAll(".faq-item"));

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (menuButton && navigation) {
        if (!navigation.id) {
            navigation.id = "site-navigation";
        }

        menuButton.setAttribute("aria-controls", navigation.id);
        menuButton.setAttribute("aria-expanded", "false");

        const setMenuState = (isOpen, returnFocus = false) => {
            navigation.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Menüyü kapat" : "Menüyü aç"
            );

            if (returnFocus) {
                menuButton.focus();
            }
        };

        menuButton.addEventListener("click", () => {
            setMenuState(!navigation.classList.contains("open"));
        });

        document.addEventListener("click", (event) => {
            if (
                navigation.classList.contains("open") &&
                !navigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                setMenuState(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                navigation.classList.contains("open")
            ) {
                setMenuState(false, true);
            }
        });

        window.addEventListener("resize", () => {
            if (
                window.innerWidth > 820 &&
                navigation.classList.contains("open")
            ) {
                setMenuState(false);
            }
        });
    }

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigationLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Menüyü aç");
            }
        });
    });

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    if (faqItems.length) {
        const faqButtons = faqItems.map((item) =>
            item.querySelector(".faq-question")
        );

        const setFaqState = (activeItem) => {
            faqItems.forEach((item) => {
                const button = item.querySelector(".faq-question");
                const answer = item.querySelector(".faq-answer");
                const isActive = item === activeItem;

                item.classList.toggle("active", isActive);
                button.setAttribute("aria-expanded", String(isActive));
                answer.setAttribute("aria-hidden", String(!isActive));
            });
        };

        faqButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const item = faqItems[index];
                setFaqState(
                    item.classList.contains("active") ? null : item
                );
            });

            button.addEventListener("keydown", (event) => {
                let nextIndex = null;

                if (event.key === "ArrowDown") {
                    nextIndex = (index + 1) % faqButtons.length;
                } else if (event.key === "ArrowUp") {
                    nextIndex =
                        (index - 1 + faqButtons.length) %
                        faqButtons.length;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = faqButtons.length - 1;
                }

                if (nextIndex !== null) {
                    event.preventDefault();
                    faqButtons[nextIndex].focus();
                }
            });
        });
    }

    if (hero) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                hero.classList.add("hero-ready");
            });
        });

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        const touchPointer = window.matchMedia(
            "(hover: none), (pointer: coarse)"
        );
        const mobileViewport = window.matchMedia("(max-width: 820px)");
        const hasTouch =
            touchPointer.matches || navigator.maxTouchPoints > 0;

        if (
            !reducedMotion.matches &&
            mobileViewport.matches &&
            hasTouch &&
            "DeviceOrientationEvent" in window &&
            typeof window.DeviceOrientationEvent.requestPermission !==
                "function"
        ) {
            let orientationFrame = null;
            let lastOrientationEvent = 0;
            let targetRotateX = 0;
            let targetRotateY = 0;
            let currentRotateX = 0;
            let currentRotateY = 0;

            const renderOrientation = () => {
                if (reducedMotion.matches) {
                    orientationFrame = null;
                    return;
                }

                currentRotateX += (
                    targetRotateX - currentRotateX
                ) * 0.12;
                currentRotateY += (
                    targetRotateY - currentRotateY
                ) * 0.12;

                hero.style.setProperty(
                    "--world-rotate-x",
                    `${currentRotateX.toFixed(2)}deg`
                );
                hero.style.setProperty(
                    "--world-rotate-y",
                    `${currentRotateY.toFixed(2)}deg`
                );
                hero.style.setProperty(
                    "--world-x",
                    `${(currentRotateY * 0.7).toFixed(2)}px`
                );
                hero.style.setProperty(
                    "--world-y",
                    `${(currentRotateX * 0.35).toFixed(2)}px`
                );

                const stillMoving =
                    Math.abs(targetRotateX - currentRotateX) > 0.05 ||
                    Math.abs(targetRotateY - currentRotateY) > 0.05;

                orientationFrame = stillMoving
                    ? requestAnimationFrame(renderOrientation)
                    : null;
            };

            window.addEventListener(
                "deviceorientation",
                (event) => {
                    if (
                        reducedMotion.matches ||
                        event.beta === null ||
                        event.gamma === null
                    ) {
                        return;
                    }

                    const beta = Math.max(
                        -30,
                        Math.min(30, event.beta)
                    );
                    const gamma = Math.max(
                        -30,
                        Math.min(30, event.gamma)
                    );

                    targetRotateY = gamma * 0.16;
                    targetRotateX = beta * -0.14;
                    lastOrientationEvent = performance.now();
                    hero.classList.add("orientation-active");

                    if (!orientationFrame) {
                        orientationFrame =
                            requestAnimationFrame(renderOrientation);
                    }
                },
                { passive: true }
            );

            window.setInterval(() => {
                if (
                    hero.classList.contains("orientation-active") &&
                    performance.now() - lastOrientationEvent > 1500
                ) {
                    hero.classList.remove("orientation-active");
                    hero.style.removeProperty("--world-x");
                    hero.style.removeProperty("--world-y");
                    hero.style.removeProperty("--world-rotate-x");
                    hero.style.removeProperty("--world-rotate-y");
                }
            }, 1000);

            reducedMotion.addEventListener("change", (event) => {
                if (event.matches) {
                    if (orientationFrame) {
                        cancelAnimationFrame(orientationFrame);
                        orientationFrame = null;
                    }

                    hero.classList.remove("orientation-active");
                    hero.style.removeProperty("--world-x");
                    hero.style.removeProperty("--world-y");
                    hero.style.removeProperty("--world-rotate-x");
                    hero.style.removeProperty("--world-rotate-y");
                }
            });
        }
    }
});
