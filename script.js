
/* ===== Smooth Navigation ===== */

document.querySelectorAll('.nav-links a, .logo, .hero a').forEach(link => {
    link.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


/* ===== Active Navigation Link ===== */

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${currentSection}`
        );
    });
});


/* ===== Footer Year Automatically Updates ===== */

const footerText = document.querySelector('footer p');

if (footerText) {
    footerText.innerHTML =
        `&copy; ${new Date().getFullYear()} Avani Tripathi. Built with HTML, CSS & JavaScript.`;
}


/* ===== Reveal Sections on Scroll ===== */

const revealSections = document.querySelectorAll('.section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealSections.forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

/* ==============================
   1. TYPING ANIMATION
================================ */

(() => {
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    const roles = [
        "Aspiring Software Developer",
        "CSE Student",
        "AI/ML Enthusiast",
        "Frontend Developer"
    ];

    // Respect the user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingElement.textContent = roles[0];
        const cursor = document.querySelector(".typing-cursor");
        if (cursor) cursor.style.display = "none";
        return;
    }

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent = currentRole.substring(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        setTimeout(typeEffect, delay);
    }

    // Start after displaying the initial heading
    setTimeout(typeEffect, 1400);
})();


/* ==============================
   2. SCROLL REVEAL ANIMATION
================================ */

(() => {
    const revealElements = document.querySelectorAll(
        ".section-title, #about .section > *, #about p, " +
        "#skills .skills-list li, .project-card, " +
        "#contact > *"
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
        return;
    }

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        // Slight stagger between elements
        element.style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 100}ms`
        );
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => observer.observe(element));
})();
