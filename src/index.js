/*
WHEN LOOKING AT PUP PUPS USER SHOULD BE ABLE TO:

CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER;
MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT INDICATES WHETHER IT IS A GOOD DOG OR A BAD DOG;
CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS;
CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE ALL DOGS IN DOG BAR.

*/

document.addEventListener("DOMContentLoaded", () => {
    fetchPups();
    }
)

function fetchPups() {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(pups => pups.forEach(pup => addPupToBar(pup)))
}

function addPupToBar(pup) {
    const dogBar = document.querySelector("#dog-bar")
    const pupSpan = document.createElement("span")
    pupSpan.innerText = pup.name
    pupSpan.addEventListener("click", () => showPup(pup))
    dogBar.append(pupSpan)
}

function showPup(pup) {
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    const pupImg = document.createElement("img")
    pupImg.src = pup.image
    const pupName = document.createElement("h2")
    pupName.innerText = pup.name
    const pupButton = document.createElement("button")
    pupButton.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
    pupButton.addEventListener("click", () => togglePup(pup, pupButton))
    dogInfo.append(pupImg, pupName, pupButton)
}

function togglePup(pup, pupButton) {
    pup.isGoodDog = !pup.isGoodDog
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({isGoodDog: pup.isGoodDog})
    })
    .then(resp => resp.json())
    .then(pup => {
        pupButton.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
    })
}

function filterPups() {
    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.addEventListener("click", () => {
        if (filterButton.innerText === "Filter good dogs: OFF") {
            filterButton.innerText = "Filter good dogs: ON"
        } else {
            filterButton.innerText = "Filter good dogs: OFF"
        }
    })
}



