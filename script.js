document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''; // Reset animation
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                 nav.classList.remove('nav-active');
                 burger.classList.remove('toggle');
                 // Reset link animations immediately
                 navLinks.forEach(link => link.style.animation = '');
            }
        });
    });


    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default only if it's an internal link
            if (this.getAttribute('href').startsWith('#') && this.getAttribute('href').length > 1) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calculate scroll position, considering fixed header height
                    const headerOffset = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    // --- Sticky Header on Scroll ---
    const header = document.getElementById('header');
    const scrollThreshold = 50; // Pixels to scroll before header becomes sticky/changes style

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect using CSS custom property
                entry.target.style.setProperty('--reveal-delay', index % 3); // Example: groups of 3
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        root: null, // relative to the viewport
        threshold: 0.1, // trigger when 10% of the element is visible
       // rootMargin: '-50px' // Optional: trigger slightly earlier/later
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- Contact Form Handling (Front-end feedback only) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // IMPORTANT: Prevent default ONLY IF you are NOT using Netlify forms' default handling
            // or if you are handling submission entirely via JS (e.g., with fetch to Formspree/backend)
            // If using standard HTML form submission to Netlify/Formspree action URL, DO NOT preventDefault.
            // Let's assume for now we give basic feedback but let the form submit normally:

             // e.preventDefault(); // Uncomment this if handling submission via fetch below

            // Basic Front-End Feedback (optional, enhances UX)
            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status'; // Reset classes

            // Simulate network delay for feedback (remove if using fetch)
            setTimeout(() => {
                // **Important:** This is just front-end feedback.
                // The form needs a server/service (like Netlify Forms or Formspree)
                // configured in the HTML's action attribute to actually send the data.
                formStatus.textContent = 'Message sent successfully! (Note: Requires backend setup)';
                formStatus.classList.add('success');
                 contactForm.reset(); // Clear the form
            }, 1000);

            /* // --- Example using Fetch for Formspree (requires preventDefault above) ---
            e.preventDefault();
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message!";
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.textContent = "Oops! There was a problem submitting your form";
                        }
                        formStatus.className = 'form-status error';
                    })
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a problem submitting your form";
                 formStatus.className = 'form-status error';
            });
            */
        });
    }


    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded