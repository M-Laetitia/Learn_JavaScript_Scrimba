

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-9d390-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

const colors = [ "#FFECDB", "#e0fce0", "#d1f3f4"];

addButtonEl.addEventListener("click", function() {
    addIngredient()
})

inputFieldEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addIngredient();
    }
});

function addIngredient() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputFieldEl();
}


onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl() 

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
        }

    } else {
        shoppingListEl.innerHTML = "No Items here... yet"
    }
       
})

function  clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    if (inputFieldEl.value != "") {
        inputFieldEl.value = ""
    }
}

function appendItemToShoppingListEl(item) {

    let itemID = item[0]
    let itemValue = item [1]

    let newEl = document.createElement("li")

    newEl.addEventListener("mouseenter", function() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        newEl.style.backgroundColor = colors[randomIndex];
    });

    newEl.addEventListener("mouseleave", function() {
        // Réinitialiser la couleur de fond lorsqu'il n'y a pas de survol
        newEl.style.backgroundColor = "";
    });

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}` ) 
        remove(exactLocationOfItemInDB)

    })

    shoppingListEl.append(newEl) 
}





