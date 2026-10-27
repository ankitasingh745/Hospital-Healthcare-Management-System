const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const successModal = document.querySelector("#successModal");
const continueButton = document.querySelector("#continueButton");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email.");
        return;
    }

    if (password === "") {
        alert("Please enter your password.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    successModal.style.display = "flex";
});

continueButton.addEventListener("click", function() {
    window.location.href = "main-dash/dash.html";
});