const dogSwapButton = document.querySelector("#dogSwapButton");
const dogButton = document.querySelector("#dogButton");
const musicButton = document.querySelector("#musicButton");
const mazeButton = document.querySelector("#mazeButton")
const generateButton = document.querySelector("#generateButton")
const solutionButton = document.querySelector("#solutionButton")
const solveButton = document.querySelector("#solveButton");

const heightInput = document.querySelector("#Height")
const lengthInput = document.querySelector("#Length");
const weightInput = document.querySelector("#Weight")
const genAlgorithmInput = document.querySelector("#MazeAlgorithm")
const startX = document.querySelector("#StartX")
const startY = document.querySelector("#StartY")
const endX = document.querySelector("#EndX")
const endY = document.querySelector("#EndY")
const solveAlgorithmInput = document.querySelector("#SolveAlgorithm")

const mazeImage = document.querySelector("#mazeImage")
const solveImage = document.querySelector("#solveDisplay")

const genAPI = "evaporatoronline.org/generate"
const solveAPI = "evaporatoronline.org/solve"

const Dog1Path = "resources/BigDog.png";
const Dog2Path = "resources/LilGuy.png";
const Dog1Name = "Loki:";
const Dog2Name = "Rocket:";

let mazeBlob = null;

let scheme = {
    dogs: "#b23a3a",
    music: "#5fb3a2",
    maze: "#f2d65c",
    solve: "#3434eb"
}



openPage("dogs", "dogButton");
genCall();

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

mazeButton.addEventListener("click", () => {
    openPage("maze", "mazeButton");
});

solutionButton.addEventListener("click", () => {
    openPage("solve", "solutionButton");
});

heightInput.addEventListener("blur", () => {
    dimensionValueFormat(heightInput);
});

heightInput.addEventListener("input", () => {
    dimensionLengthFormat(heightInput)
})

lengthInput.addEventListener("blur", () => {
    dimensionValueFormat(lengthInput);
});

lengthInput.addEventListener("input", () => {
    dimensionLengthFormat(lengthInput)
});

generateButton.addEventListener("click", () => {
    genCall();
});

solveButton.addEventListener("click", () => {
    solveCall();
});

function dimensionLengthFormat(workingElement){
    if (workingElement.value.length > 4){
        workingElement.value = workingElement.value.slice(0, 4);
        dimensionValueFormat(workingElement);
    }
}

function dimensionValueFormat(workingElement){
    if (workingElement.value < 5) {
        workingElement.value = 5;
    } else if (workingElement.value > 1000) {
        workingElement.value = 1000
    }
}

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

    document.getElementById(pageId).style.backgroundColor = scheme[pageId];
    document.getElementById(buttonId).style.backgroundColor = scheme[pageId];
}

async function genCall(){
    var Height = heightInput.value;
    var Length = lengthInput.value;
    var Weight = weightInput.value;
    var Algorithm = genAlgorithmInput.value;
    var cacheFiller = Date.now();

    const response = await(fetch(`https://${genAPI}?Length=${Length}&Height=${Height}&Weight=${Weight}&Algorithm=${Algorithm}&_=${cacheFiller}`));
    const blob = await response.blob();
    mazeBlob = blob;

    if (mazeImage.src) {
        URL.revokeObjectURL(mazeImage.src);
    }
    mazeImage.src = URL.createObjectURL(blob);

    if (!solveImage.src){
        solveImage.src = mazeImage.src
    }
}

async function solveCall() {

    if (!mazeBlob) {
        alert("Generate a maze first.");
        return;
    }

    var startXCoord = startX.value;
    var startYCoord = startY.value
    var endXCoord = endX.value;
    var endYCoord = endY.value;
    var Algorithm = solveAlgorithmInput.value;

    const form = new FormData();
    form.append("image", mazeBlob, "maze.png");
    form.append("Start", `${startXCoord}-${startYCoord}`);
    form.append("End", `${endXCoord}-${endYCoord}`);
    form.append("Algorithm", Algorithm);

    const response = await fetch(`https://${solveAPI}`, {method : "POST", body : form});
    const blob = await response.blob();

    if (solveImage.src) {
        URL.revokeObjectURL(solveImage.src);
    }
    solveImage.src = URL.createObjectURL(blob);
}