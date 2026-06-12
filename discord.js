const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

// Only run slider if slides exist
if (slides.length > 0) {

    showSlide(0);

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 3000);
}

// Mobile menu
function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("show");
}

// Discord button
function joinDiscord() {
    window.open(
        "https://discord.gg/4exQrGSjWs"
    );
}