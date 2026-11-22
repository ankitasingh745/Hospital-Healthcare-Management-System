
const searchInput = document.querySelector("#specialtySearch");
const specialtyCards = document.querySelectorAll(".specialty-card");
const noResults = document.querySelector("#noResults");
const currentYear = document.querySelector("#currentYear");

currentYear.textContent = new Date().getFullYear();

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim().toLowerCase();

    let visibleCards = 0;

    specialtyCards.forEach(function (card) {
        const specialtyName = card.textContent.toLowerCase();

        if (specialtyName.includes(searchValue)) {
            card.style.display = "block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCards === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
});
