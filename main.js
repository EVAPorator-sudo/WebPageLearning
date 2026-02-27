const testButton = document.querySelector("#testButton");
const dogButton = document.querySelector("#dogButton");

var Dog1Path = "resources/BigDog.jpg";
var Dog2Path = "resources/LilGuy.jpg";
var Dog1Name = "Loki:";
var Dog2Name = "Rocket:";

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

dogButton.addEventListener("click", () => {
    const dogImage = document.getElementById("DogImage");
    const dogName = document.getElementById("DogName");
    dogSwap(dogImage, dogName);
});

testButton.addEventListener("click", () => {
    alertTest("Hello World");
});