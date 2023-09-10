
let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0

function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    let saveCount = count + " - "
    saveEl.textContent += saveCount 
    count = 0
    countEl.textContent = count
}

console.log("Let's count people on the subway!")


