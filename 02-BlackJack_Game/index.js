
let player = {
    name :"May",
    chips : 26,
    sayHello: function () {
        console.log("Bonjour!")
    }
}

// player.sayHello()

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let btnClicked = document.querySelectorAll('.btn')
let messageEl = document.getElementById("message-el")
let sumEl = document.querySelector("#sum-el")
let cardsEl = document.getElementById("cards-el")



let playerEL = document.getElementById("player-el")
playerEL.textContent = player.name + " : " + player.chips + "€"

console.log(cards)


function getRandomCard() {
    let randomCard = Math.floor (Math.random() *13 ) +1 

        if (randomCard === 1) {
            return 11
        } else if (  randomCard > 10) {
            return 10
        } else  {
            return randomCard
        }
}


function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    renderGame()
}

function renderGame() {
    sumEl.textContent =  "Sum : " + sum
    cardsEl.textContent = "Cards : "
        for (let i=0; i < cards.length; i++) {
            cardsEl.textContent += cards[i] + " "
        }

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true    

    } else {
        message = "You're out of the game!"
        isAlive = false
    }

    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let newCard = getRandomCard()
        sum  += newCard
        cards.push(newCard)
        renderGame()
    }
}
    

