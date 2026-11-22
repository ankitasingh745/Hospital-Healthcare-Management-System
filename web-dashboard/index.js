
const serviceLinks = document.querySelectorAll(".service-card a");
const navigationLinks = document.querySelectorAll(".navbar nav a");
const sections = document.querySelectorAll("main section[id]");

const copyrightText = document.querySelector(".copyright");

if (copyrightText) {
    copyrightText.textContent =
        `© ${new Date().getFullYear()} MediCare. All Rights Reserved.`;
}

serviceLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        const serviceName = link.parentElement
            .querySelector("h3").textContent.trim();

        sessionStorage.setItem("medicareSelectedService", serviceName);
    });
});

if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navigationLinks.forEach(function (link) {
                    const isCurrentSection =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.style.color = isCurrentSection ? "#1677c8" : "";
                    link.style.fontWeight = isCurrentSection ? "700" : "";
                });
            }
        });
    }, {
        root: null,
        threshold: 0.35
    });

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

const backToTopButton = document.createElement("button");

backToTopButton.type = "button";
backToTopButton.textContent = "↑ Top";
backToTopButton.setAttribute("aria-label", "Back to top");
backToTopButton.style.position = "fixed";
backToTopButton.style.right = "22px";
backToTopButton.style.bottom = "22px";
backToTopButton.style.padding = "11px 16px";
backToTopButton.style.border = "none";
backToTopButton.style.borderRadius = "7px";
backToTopButton.style.background = "#1677c8";
backToTopButton.style.color = "white";
backToTopButton.style.fontWeight = "600";
backToTopButton.style.cursor = "pointer";
backToTopButton.style.display = "none";
backToTopButton.style.zIndex = "1000";

document.body.appendChild(backToTopButton);

window.addEventListener("scroll", function () {
    backToTopButton.style.display =
        window.scrollY > 300 ? "block" : "none";
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
