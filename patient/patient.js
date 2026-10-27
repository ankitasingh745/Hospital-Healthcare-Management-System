const patientForm = document.getElementById("patientForm");

const previewOverlay = document.createElement("div");
previewOverlay.className = "preview-overlay";
previewOverlay.style.display = "none";

previewOverlay.innerHTML = `
    <div class="preview-card">
        <h1>Patient Details Preview</h1>
        <p>Please review the information before submitting.</p>
        <div id="previewContent"></div>
        <div class="preview-actions">
            <button type="button" class="secondary-btn" id="editDetails">Edit Details</button>
            <button type="button" class="primary-btn" id="confirmDetails">Confirm Registration</button>
        </div>
    </div>
`;

document.body.appendChild(previewOverlay);

const successOverlay = document.createElement("div");
successOverlay.className = "success-overlay";
successOverlay.style.display = "none";

successOverlay.innerHTML = `
    <div class="success-card">
        <div class="success-icon">&#10003;</div>
        <h1>Registration Successful!</h1>
        <p>The patient has been registered successfully.</p>
        <div class="patient-id">
            Patient ID: <strong id="generatedPatientId"></strong>
        </div>
        <button type="button" class="primary-btn" id="finishRegistration">Done</button>
    </div>
`;

document.body.appendChild(successOverlay);

patientForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!patientForm.checkValidity()) {
        patientForm.reportValidity();
        return;
    }

    const phone = document.getElementById("phone").value.trim();
    const pinCode = document.getElementById("pinCode").value.trim();
    const emergencyPhone = document.getElementById("emergencyPhone").value.trim();
    const relationship = document.getElementById("relationship").value;
    const otherRelationship = document.getElementById("otherRelationship").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        document.getElementById("phone").focus();
        return;
    }

    if (!/^[0-9]{6}$/.test(pinCode)) {
        alert("Please enter a valid 6-digit PIN code.");
        document.getElementById("pinCode").focus();
        return;
    }

    if (!/^[0-9]{10}$/.test(emergencyPhone)) {
        alert("Please enter a valid 10-digit emergency contact number.");
        document.getElementById("emergencyPhone").focus();
        return;
    }

    if (relationship === "Other" && otherRelationship === "") {
        alert("Please specify the relationship.");
        document.getElementById("otherRelationship").focus();
        return;
    }

    const formData = new FormData(patientForm);

    const sections = [
        {
            title: "Personal Information",
            fields: ["fullName", "dateOfBirth", "gender", "bloodGroup"]
        },
        {
            title: "Contact Information",
            fields: ["phone", "email", "address", "city", "state", "pinCode"]
        },
        {
            title: "Emergency Contact",
            fields: ["emergencyName", "relationship", "emergencyPhone"]
        },
        {
            title: "Medical Information",
            fields: ["medicalConditions", "allergies", "medications"]
        },
        {
            title: "Insurance Information",
            fields: ["insuranceProvider", "policyNumber"]
        }
    ];

    const labels = {
        fullName: "Full Name",
        dateOfBirth: "Date of Birth",
        gender: "Gender",
        bloodGroup: "Blood Group",
        phone: "Phone Number",
        email: "Email Address",
        address: "Address",
        city: "City",
        state: "State",
        pinCode: "PIN Code",
        emergencyName: "Contact Name",
        relationship: "Relationship",
        emergencyPhone: "Contact Number",
        medicalConditions: "Medical Conditions",
        allergies: "Allergies",
        medications: "Current Medications",
        insuranceProvider: "Insurance Provider",
        policyNumber: "Policy Number"
    };

    const previewContent = document.getElementById("previewContent");
    previewContent.replaceChildren();

    sections.forEach(function (section) {
        const sectionElement = document.createElement("section");
        sectionElement.className = "preview-section";

        const heading = document.createElement("h2");
        heading.textContent = section.title;

        const grid = document.createElement("div");
        grid.className = "preview-grid";

        section.fields.forEach(function (field) {
            const item = document.createElement("div");

            if (
                field === "address" ||
                field === "medicalConditions" ||
                field === "allergies" ||
                field === "medications"
            ) {
                item.className = "preview-full";
            }

            const label = document.createElement("strong");
            label.textContent = labels[field];

            const value = document.createElement("span");
            value.textContent = formData.get(field) || "Not provided";

            item.append(label, value);
            grid.appendChild(item);
        });

        if (section.title === "Emergency Contact" && relationship === "Other") {
            const item = document.createElement("div");

            const label = document.createElement("strong");
            label.textContent = "Specified Relationship";

            const value = document.createElement("span");
            value.textContent = otherRelationship;

            item.append(label, value);
            grid.appendChild(item);
        }

        sectionElement.append(heading, grid);
        previewContent.appendChild(sectionElement);
    });

    previewOverlay.style.display = "flex";
});

document.getElementById("editDetails").addEventListener("click", function () {
    previewOverlay.style.display = "none";
});

document.getElementById("confirmDetails").addEventListener("click", function () {
    const patientId = "PAT-" + Date.now().toString().slice(-8);

    document.getElementById("generatedPatientId").textContent = patientId;

    previewOverlay.style.display = "none";
    successOverlay.style.display = "flex";

    patientForm.reset();
});

document.getElementById("finishRegistration").addEventListener("click", function () {
    successOverlay.style.display = "none";
});
