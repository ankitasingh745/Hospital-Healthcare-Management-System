const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const rememberCheckbox = document.querySelector("#remember");
const successModal = document.querySelector("#successModal");
const continueButton = document.querySelector("#continueButton");

const emailFeedback = document.createElement("small");
const passwordFeedback = document.createElement("small");
const strengthText = document.createElement("small");
const togglePasswordButton = document.createElement("button");

function prepareFeedback(input, feedback) {
    feedback.style.display = "block";
    feedback.style.marginTop = "6px";
    feedback.style.fontSize = "12px";
    feedback.setAttribute("aria-live", "polite");
    input.parentElement.appendChild(feedback);
}

prepareFeedback(emailInput, emailFeedback);
prepareFeedback(passwordInput, passwordFeedback);

togglePasswordButton.type = "button";
togglePasswordButton.textContent = "Show Password";
togglePasswordButton.style.marginTop = "8px";
togglePasswordButton.style.padding = "6px 10px";
togglePasswordButton.style.border = "1px solid #1976d2";
togglePasswordButton.style.borderRadius = "5px";
togglePasswordButton.style.background = "white";
togglePasswordButton.style.color = "#1976d2";
togglePasswordButton.style.cursor = "pointer";

passwordInput.parentElement.appendChild(togglePasswordButton);
prepareFeedback(passwordInput, strengthText);

window.addEventListener("DOMContentLoaded", function () {
    const savedEmail = localStorage.getItem("medicareSavedEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length === 0) return "";
    if (score <= 2) return "Password strength: Weak";
    if (score <= 4) return "Password strength: Medium";

    return "Password strength: Strong";
}

emailInput.addEventListener("input", function () {
    const email = emailInput.value.trim();

    if (email.length === 0) {
        emailFeedback.textContent = "";
    } else if (validateEmail(email)) {
        emailFeedback.textContent = "Email format looks valid.";
        emailFeedback.style.color = "#16834a";
    } else {
        emailFeedback.textContent = "Please enter a valid email address.";
        emailFeedback.style.color = "#d93025";
    }
});

passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);

    strengthText.textContent = strength;

    strengthText.style.color = strength.includes("Strong")
        ? "#16834a"
        : strength.includes("Medium")
            ? "#b7791f"
            : "#d93025";

    if (password.length === 0) {
        passwordFeedback.textContent = "";
    } else if (password.length < 6) {
        passwordFeedback.textContent = "Use at least 6 characters.";
        passwordFeedback.style.color = "#d93025";
    } else {
        passwordFeedback.textContent = "Minimum length requirement met.";
        passwordFeedback.style.color = "#16834a";
    }
});

togglePasswordButton.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    togglePasswordButton.textContent = isHidden
        ? "Hide Password"
        : "Show Password";
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateEmail(email)) {
        emailFeedback.textContent = "Please enter a valid email address.";
        emailFeedback.style.color = "#d93025";
        emailInput.focus();
        return;
    }

    if (password.length < 6) {
        passwordFeedback.textContent =
            "Password must contain at least 6 characters.";
        passwordFeedback.style.color = "#d93025";
        passwordInput.focus();
        return;
    }

    if (rememberCheckbox.checked) {
        localStorage.setItem("medicareSavedEmail", email);
    } else {
        localStorage.removeItem("medicareSavedEmail");
    }

    sessionStorage.setItem("medicareLoggedInUser", email);

    successModal.style.display = "flex";
});

continueButton.addEventListener("click", function () {
    window.location.href = "main-dash/dash.html";
});
