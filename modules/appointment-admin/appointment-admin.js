document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const newAppointmentBtn = document.querySelector(".header button");
    const formCard = document.querySelector(".form-card");

    const patientId = document.querySelector('input[placeholder="PAT-2045"]');
    const patientName = document.querySelector('input[placeholder="Enter patient name"]');

    const department = document.querySelectorAll("select")[0];
    const doctor = document.querySelectorAll("select")[1];

    const appointmentDate = document.querySelector('input[type="date"]');
    const appointmentTime = document.querySelector('input[type="time"]');

    const visitType = document.querySelectorAll("select")[2];
    const roomNumber = document.querySelector('input[placeholder="Room 205"]');

    const priorityInputs = document.querySelectorAll('input[name="priority"]');

    const reason = document.querySelector('textarea[placeholder="Enter symptoms or reason for appointment"]');
    const adminNotes = document.querySelector('textarea[placeholder="Internal appointment remarks"]');

    const stats = document.querySelectorAll(".card h2");

    function updateStats() {

        const appointments = Number(stats[0].textContent);
        const pending = Number(stats[1].textContent);

        stats[0].textContent = appointments + 1;
        stats[1].textContent = Math.max(0, pending - 1);

    }

    newAppointmentBtn.addEventListener("click", function () {

        formCard.scrollIntoView({ behavior: "smooth" });
        patientId.focus();

    });

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        if (
            !patientId.value.trim() ||
            !patientName.value.trim() ||
            department.selectedIndex === 0 ||
            doctor.selectedIndex === 0 ||
            !appointmentDate.value ||
            !appointmentTime.value
        ) {

            alert("Please fill in all required appointment details.");
            return;

        }

        const selectedPriority = document.querySelector(
            'input[name="priority"]:checked'
        );

        const appointment = {

            patientId: patientId.value.trim(),
            patientName: patientName.value.trim(),
            department: department.value,
            doctor: doctor.value,
            date: appointmentDate.value,
            time: appointmentTime.value,
            visitType: visitType.value,
            roomNumber: roomNumber.value.trim(),

            priority: selectedPriority
                ? selectedPriority.parentElement.textContent.trim()
                : "Normal",

            reason: reason.value.trim(),
            adminNotes: adminNotes.value.trim()

        };

        updateStats();

        alert("Appointment Confirmed!");

        form.reset();

    });

    form.addEventListener("reset", function () {

        setTimeout(function () {

            priorityInputs.forEach(function (input) {

                input.checked = false;

            });

        }, 0);

    });

    appointmentDate.min = new Date().toISOString().split("T")[0];

});