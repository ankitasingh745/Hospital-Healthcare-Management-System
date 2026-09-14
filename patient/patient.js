 const form = document.getElementById("patientForm");


// =========================
// FORM SUBMIT → PREVIEW
// =========================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const patientData = {
        fullName: document.getElementById("fullName").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        bloodGroup: document.getElementById("bloodGroup").value,

        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pinCode: document.getElementById("pinCode").value,

        emergencyName: document.getElementById("emergencyName").value,
        relationship: document.getElementById("relationship").value,
        emergencyPhone: document.getElementById("emergencyPhone").value,

        medicalConditions: document.getElementById("medicalConditions").value,
        allergies: document.getElementById("allergies").value,
        medications: document.getElementById("medications").value,

        insuranceProvider: document.getElementById("insuranceProvider").value,
        policyNumber: document.getElementById("policyNumber").value
    };

    showPreview(patientData);
});


// =========================
// PREVIEW
// =========================

function showPreview(patient) {

    const preview = document.createElement("div");

    preview.id = "previewBox";

    preview.innerHTML = `
        <div class="preview-overlay">

            <div class="preview-card">

                <h1>Patient Details Preview</h1>
                <p>Please review all information before submitting.</p>


                <div class="preview-section">

                    <h2>Personal Information</h2>

                    <div class="preview-grid">

                        <div>
                            <strong>Full Name</strong>
                            <span>${patient.fullName}</span>
                        </div>

                        <div>
                            <strong>Date of Birth</strong>
                            <span>${patient.dateOfBirth}</span>
                        </div>

                        <div>
                            <strong>Age</strong>
                            <span>${patient.age}</span>
                        </div>

                        <div>
                            <strong>Gender</strong>
                            <span>${patient.gender}</span>
                        </div>

                        <div>
                            <strong>Blood Group</strong>
                            <span>${patient.bloodGroup}</span>
                        </div>

                    </div>

                </div>


                <div class="preview-section">

                    <h2>Contact Information</h2>

                    <div class="preview-grid">

                        <div>
                            <strong>Phone Number</strong>
                            <span>${patient.phone}</span>
                        </div>

                        <div>
                            <strong>Email</strong>
                            <span>${patient.email}</span>
                        </div>

                        <div class="preview-full">
                            <strong>Address</strong>
                            <span>${patient.address}</span>
                        </div>

                        <div>
                            <strong>City</strong>
                            <span>${patient.city}</span>
                        </div>

                        <div>
                            <strong>State</strong>
                            <span>${patient.state}</span>
                        </div>

                        <div>
                            <strong>PIN Code</strong>
                            <span>${patient.pinCode}</span>
                        </div>

                    </div>

                </div>


                <div class="preview-section">

                    <h2>Emergency Contact</h2>

                    <div class="preview-grid">

                        <div>
                            <strong>Contact Name</strong>
                            <span>${patient.emergencyName}</span>
                        </div>

                        <div>
                            <strong>Relationship</strong>
                            <span>${patient.relationship}</span>
                        </div>

                        <div>
                            <strong>Contact Number</strong>
                            <span>${patient.emergencyPhone}</span>
                        </div>

                    </div>

                </div>


                <div class="preview-section">

                    <h2>Medical Information</h2>

                    <div class="preview-grid">

                        <div class="preview-full">
                            <strong>Existing Conditions</strong>
                            <span>${patient.medicalConditions || "Not provided"}</span>
                        </div>

                        <div class="preview-full">
                            <strong>Allergies</strong>
                            <span>${patient.allergies || "Not provided"}</span>
                        </div>

                        <div class="preview-full">
                            <strong>Current Medications</strong>
                            <span>${patient.medications || "Not provided"}</span>
                        </div>

                    </div>

                </div>


                <div class="preview-section">

                    <h2>Insurance Information</h2>

                    <div class="preview-grid">

                        <div>
                            <strong>Insurance Provider</strong>
                            <span>${patient.insuranceProvider || "Not provided"}</span>
                        </div>

                        <div>
                            <strong>Policy Number</strong>
                            <span>${patient.policyNumber || "Not provided"}</span>
                        </div>

                    </div>

                </div>


                <div class="preview-actions">

                    <button
                        type="button"
                        id="editBtn"
                        class="secondary-btn">
                        ← Edit Details
                    </button>

                    <button
                        type="button"
                        id="confirmBtn"
                        class="primary-btn">
                        ✓ Confirm & Submit
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(preview);


    // EDIT BUTTON

    document.getElementById("editBtn").addEventListener("click", function () {
        preview.remove();
    });


    // CONFIRM BUTTON

    document.getElementById("confirmBtn").addEventListener("click", function () {
        submitPatient(patient);
    });
}


// =========================
// FINAL SUBMISSION
// =========================

function submitPatient(patient) {

    const patientId = generatePatientId();

    const registeredPatient = {
        patientId: patientId,
        registrationDate: new Date().toISOString().split("T")[0],
        ...patient,
        appointmentHistory: []
    };


    // Save registered patient in browser storage

    localStorage.setItem(
        "registeredPatient",
        JSON.stringify(registeredPatient)
    );


    document.getElementById("previewBox").remove();


    // Success message

    const successBox = document.createElement("div");

    successBox.innerHTML = `
        <div class="success-overlay">

            <div class="success-card">

                <div class="success-icon">✓</div>

                <h1>Registration Successful!</h1>

                <p>The patient has been registered successfully.</p>

                <div class="patient-id">
                    Patient ID: <strong>${patientId}</strong>
                </div>

                <button
                    type="button"
                    class="primary-btn"
                    onclick="location.reload()">
                    Done
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(successBox);
}


// =========================
// PATIENT ID GENERATOR
// =========================

function generatePatientId() {

    const lastId = localStorage.getItem("lastPatientId");

    let nextNumber = 1;

    if (lastId) {
        nextNumber = parseInt(lastId) + 1;
    }

    localStorage.setItem("lastPatientId", nextNumber);

    return "P" + String(nextNumber).padStart(3, "0");
}