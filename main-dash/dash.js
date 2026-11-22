
const logoutButton = document.querySelector("#logoutButton");
const dashboardSection = document.querySelector(".dashboard-section");
const dashboardHeading = document.querySelector(".welcome h1");
const dashboardCards = document.querySelectorAll(".dashboard-card");
const cardsContainer = document.querySelector(".dashboard-cards");

const loggedInUser = sessionStorage.getItem("medicareLoggedInUser");

if (loggedInUser && dashboardHeading) {
    const displayName = loggedInUser.split("@")[0];
    dashboardHeading.textContent = `Welcome, ${displayName}`;
}

const searchWrapper = document.createElement("div");
searchWrapper.style.maxWidth = "500px";
searchWrapper.style.margin = "0 auto 30px";

const searchInput = document.createElement("input");
searchInput.type = "search";
searchInput.placeholder = "Search dashboard modules...";
searchInput.setAttribute("aria-label", "Search dashboard modules");
searchInput.style.width = "100%";
searchInput.style.padding = "13px 16px";
searchInput.style.border = "1px solid #cbd5e1";
searchInput.style.borderRadius = "8px";
searchInput.style.fontSize = "15px";
searchInput.style.outlineColor = "#1976d2";

const searchMessage = document.createElement("p");
searchMessage.textContent = "";
searchMessage.style.marginTop = "10px";
searchMessage.style.textAlign = "center";
searchMessage.style.color = "#64748b";
searchMessage.setAttribute("aria-live", "polite");

searchWrapper.append(searchInput, searchMessage);
cardsContainer.parentElement.insertBefore(searchWrapper, cardsContainer);

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    dashboardCards.forEach(function (card) {
        const cardContent = card.textContent.toLowerCase();
        const matches = cardContent.includes(searchValue);

        card.style.display = matches ? "block" : "none";

        if (matches) visibleCards++;
    });

    searchMessage.textContent = visibleCards === 0
        ? "No matching module found. Try another keyword."
        : `${visibleCards} module(s) found.`;
});

dashboardCards.forEach(function (card) {
    const moduleLink = card.querySelector(".module-button");

    if (moduleLink && moduleLink.getAttribute("href") === "#") {
        moduleLink.addEventListener("click", function (event) {
            event.preventDefault();

            const moduleName = card.querySelector("h2").textContent;

            alert(`${moduleName} module is not connected yet.`);
        });
    }
});

logoutButton.addEventListener("click", function () {
    const shouldLogout = confirm("Are you sure you want to sign out?");

    if (shouldLogout) {
        sessionStorage.removeItem("medicareLoggedInUser");

        window.location.href = "../web-dashboard/index.html";
    }
});
