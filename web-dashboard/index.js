const serviceLinks = document.querySelectorAll(".service-card a");

serviceLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const serviceName = link.parentElement.querySelector("h3").textContent;

        alert(serviceName + " section selected.");

    });

});