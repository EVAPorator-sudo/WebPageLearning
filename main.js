const testButton = document.querySelector("button")

function alerTest(popup){
    alert(popup);
}

testButton.addEventListener("click", () => {
    alerTest("Hello World");
})