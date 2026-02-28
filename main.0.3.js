const dogSwapButton = document.querySelector("#dogSwapButton");
const dogButton = document.querySelector("#dogButton");
const musicButton = document.querySelector("#musicButton");

let scheme = {
    dogs : "crimson",
    music : "aquamarine"
}

const Dog1Path = "resources/BigDog.png";
const Dog2Path = "resources/LilGuy.png";
const Dog1Name = "Loki:";
const Dog2Name = "Rocket:";

openPage("dogs", "dogButton");

function alertTest(popup) {
    alert(popup);
}

function dogSwap(dogImage, dogName) {
    const path = dogImage.getAttribute("src");

    if (path.includes(Dog1Path)) {
        dogImage.setAttribute("src", Dog2Path);
        dogName.textContent = Dog2Name;
    } else {
        dogImage.setAttribute("src", Dog1Path);
        dogName.textContent = Dog1Name;
    }
}

dogSwapButton.addEventListener("click", () => {
    const dogImage = document.getElementById("DogImage");
    const dogName = document.getElementById("DogName");

    dogSwap(dogImage, dogName);
});

dogButton.addEventListener("click", () => {
    openPage("dogs", "dogButton");
});

musicButton.addEventListener("click", () => {
    openPage("music", "musicButton");
});

function openPage(pageId, buttonId) {
    const content = document.getElementsByClassName("tab");
    for (const element of content) {
        element.classList.remove("active");
    }

    const links = document.getElementsByClassName("tabLink");
    for (const element of links) {
        element.style.backgroundColor = "";
    }

    const page = document.getElementById(pageId);
    page.classList.add("active");

    document.getElementById(buttonId).style.backgroundColor = scheme[pageId];
}