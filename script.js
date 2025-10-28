document.querySelector('.headline').addEventListener('animationend', () => {
    document.querySelector('.headline').classList.add('animation-ended');
});

document.addEventListener("DOMContentLoaded", () => {

    const elements = {
        bannerIntro: document.querySelector(".banner-intro"),
        about: {
            section: document.querySelector("#about"),
            headlines: document.querySelector(".section-headlines"),
            profilePic: document.querySelector(".profile-pic"),
            bodyText: document.querySelector(".body-text")
        },
        projects: {
            section: document.querySelector("#projects"),
            headlines: document.querySelector(".projects-headlines"),
            container: document.querySelector(".projects-container")
        },
        coding: {
            section: document.querySelector("#coding"),
            headlines: document.querySelector(".coding-headlines"),
            container: document.querySelector(".coding-projects-container")
        },
        contact: {
            section: document.querySelector("#contact"),
            headlines: document.querySelector(".contact-headlines"),
            cards: document.querySelectorAll(".single-card")
        }
    };


    setTimeout(() => {
        const { bannerIntro } = elements;
        bannerIntro.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url("background.svg")';
        bannerIntro.style.backgroundRepeat = 'no-repeat';
        bannerIntro.style.backgroundSize = 'cover';
        bannerIntro.style.backgroundPosition = 'center';
        bannerIntro.style.transition = "background-image 4s ease-in-out, opacity 4s ease-in-out";
        bannerIntro.style.opacity = "1";
    }, 6000);

   
    document.querySelector('a[href="#about"]').addEventListener('click', event => {
        if (window.innerWidth > 768) {
            event.preventDefault();
            const offset = elements.about.section.getBoundingClientRect().top + window.scrollY - 50;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });


    const observerCallback = (entries, section) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                switch (section) {
                    case 'about':
                        const { section: aboutSection, headlines, profilePic, bodyText } = elements.about;
                        [aboutSection, headlines, profilePic, bodyText].forEach(el => el.classList.add("visible"));
                        setTimeout(() => {
                            aboutSection.style.backgroundImage = 'url("background-right.svg")';
                        }, 1000);
                        break;

                    case 'projects':
                        const { section: projectsSection, headlines: projectsHeadlines, container } = elements.projects;
                        [projectsSection, projectsHeadlines, container].forEach(el => el.classList.add("visible"));
                        break;

                    case 'coding':
                        const { section: codingSection, headlines: codingHeadlines, container: codingContainer } = elements.coding;
                        [codingSection, codingHeadlines, codingContainer].forEach(el => el.classList.add("visible"));
                        setTimeout(() => {
                            if (codingSection) {
                                codingSection.style.backgroundImage = 'url("background-right.svg")';
                                codingSection.style.backgroundRepeat = "no-repeat";
                            }
                        }, 3000);
                        break;

                    case 'contact':
                        const { section: contactSection, headlines: contactHeadlines, cards } = elements.contact;
                        [contactSection, contactHeadlines].forEach(el => el.classList.add("visible"));
                        cards.forEach((card, index) => {
                            setTimeout(() => card.classList.add("visible"), 200 * index);
                        });
                        setTimeout(() => {
                            if (contactSection) {
                                contactSection.style.backgroundImage = 'url("background.svg")';
                                contactSection.style.backgroundRepeat = "no-repeat";
                            }
                        }, 3000);
                        break;
                }
            }
        });
    };

  
    const createObserver = (threshold, section) => {
        return new IntersectionObserver(
            (entries) => observerCallback(entries, section),
            { threshold }
        );
    };


    const aboutObserver = createObserver(0.3, 'about');
    const projectsObserver = createObserver(0.1, 'projects');
    const codingObserver = createObserver(0.1, 'coding');
    const contactObserver = createObserver(0.3, 'contact');

   
    aboutObserver.observe(elements.about.section);
    projectsObserver.observe(elements.projects.section);
    codingObserver.observe(elements.coding.section);
    contactObserver.observe(elements.contact.section);
});

document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('.body-text .text-card');

    details.forEach(d => {
        d.addEventListener('toggle', () => {
            if (d.open) {
                details.forEach(other => {
                    if (other !== d) other.removeAttribute('open');
                });
            }
        });
    });
});
