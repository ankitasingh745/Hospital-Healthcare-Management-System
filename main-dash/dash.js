const logoutButton = document.querySelector("#logoutButton");

logoutButton.addEventListener("click", function() {

    alert("You have been signed out.");

    window.location.href = "../web-dashboard/index.html";

});