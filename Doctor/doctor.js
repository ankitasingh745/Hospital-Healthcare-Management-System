
console.log("Doctor JavaScript loaded successfully!");

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("doctorSearch");
    const specializationFilter =
        document.getElementById("specializationFilter");
    const availabilityFilter =
        document.getElementById("availabilityFilter");
    const doctorCount = document.getElementById("doctorCount");
    const doctorGrid = document.querySelector(".doctor-grid");

     
    if (
        !searchInput ||
        !specializationFilter ||
        !availabilityFilter ||
        !doctorCount ||
        !doctorGrid
    ) {
        console.error(
            "Required HTML elements are missing. Check the IDs in doctor.html."
        );
        return;
    }

    const doctorCards = doctorGrid.querySelectorAll(".doctor-card");

    console.log("Doctor cards found:", doctorCards.length);

    function filterDoctors() {

        const searchText = searchInput.value.toLowerCase().trim();
        const selectedSpecialization = specializationFilter.value;
        const selectedAvailability = availabilityFilter.value;

        let visibleCount = 0;

        doctorCards.forEach(function (card) {

            const name = card.querySelector("h3")
                .textContent.toLowerCase();

            const specialization = card
                .querySelector(".specialization")
                .textContent.trim();

            const status = card
                .querySelector(".status")
                .textContent.replace("●", "")
                .trim();

            const matchesSearch =
                name.includes(searchText) ||
                specialization.toLowerCase().includes(searchText);

            const matchesSpecialization =
                selectedSpecialization === "all" ||
                specialization === selectedSpecialization;

            const matchesAvailability =
                selectedAvailability === "all" ||
                status === selectedAvailability;

            const shouldShow =
                matchesSearch &&
                matchesSpecialization &&
                matchesAvailability;

            card.style.display = shouldShow ? "" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        doctorCount.textContent =
            visibleCount +
            (visibleCount === 1 ? " Doctor" : " Doctors");

        const noResults = document.getElementById("noResults");

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        } else {
            let message = document.getElementById("noDoctorMessage");

            if (!message) {
                message = document.createElement("p");
                message.id = "noDoctorMessage";
                message.className = "no-results";
                message.textContent =
                    "No doctors found. Try another search.";
                doctorGrid.after(message);
            }

            message.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    }

    searchInput.addEventListener("input", filterDoctors);
    specializationFilter.addEventListener("change", filterDoctors);
    availabilityFilter.addEventListener("change", filterDoctors);

    
    doctorCards.forEach(function (card) {

        const button = card.querySelector(".card-footer button");

        if (!button) return;

        const name = card.querySelector("h3").textContent.trim();

        const status = card.querySelector(".status")
            .textContent.replace("●", "").trim();

        if (status === "On Leave") {
            button.disabled = true;
            button.classList.add("disabled");
        }

        button.addEventListener("click", function () {

            const specialization = card
                .querySelector(".specialization")
                .textContent.trim();

            const info = card.querySelectorAll(".info-item");

            const days = info[0].querySelector("strong").textContent;
            const time = info[1].querySelector("strong").textContent;
            const slots = card.querySelector(".slots").textContent.trim();

            alert(
                "DOCTOR SCHEDULE\n\n" +
                "Name: " + name + "\n" +
                "Specialization: " + specialization + "\n" +
                "Status: " + status + "\n" +
                "Available Days: " + days + "\n" +
                "Consultation Time: " + time + "\n" +
                "Slots: " + slots
            );
        });
    });

     
    filterDoctors();

});
