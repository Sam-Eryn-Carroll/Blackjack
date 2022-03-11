
const cards = [
    { suit: 'diamonds', rank: 'r02', value: 2}, { suit: 'hearts', rank: 'r02', value: 2}, 
    { suit: 'spades', rank: 'r02', value: 2}, { suit: 'clubs', rank: 'r02', value: 2},
    { suit: 'diamonds', rank: 'r03', value: 3}, { suit: 'hearts', rank: 'r03', value: 3},
    { suit: 'spades', rank: 'r03', value: 3}, { suit: 'clubs', rank: 'r03', value: 3},
    { suit: 'diamonds', rank: 'r04', value: 4}, { suit: 'hearts', rank: 'r04', value: 4}, 
    { suit: 'spades', rank: 'r04', value: 4}, { suit: 'clubs', rank: 'r04', value: 4},
    { suit: 'diamonds', rank: 'r05', value: 5}, { suit: 'hearts', rank: 'r05', value: 5}, 
    { suit: 'spades', rank: 'r05', value: 5}, { suit: 'clubs', rank: 'r05', value: 5},
    { suit: 'diamonds', rank: 'r06', value: 6}, { suit: 'hearts', rank: 'r06', value: 6}, 
    { suit: 'spades', rank: 'r06', value: 6}, { suit: 'clubs', rank: 'r06', value: 6},
    { suit: 'diamonds', rank: 'r07', value: 7}, { suit: 'hearts', rank: 'r07', value: 7}, 
    { suit: 'spades', rank: 'r07', value: 7}, { suit: 'clubs', rank: 'r07', value: 7},
    { suit: 'diamonds', rank: 'r08', value: 8}, { suit: 'hearts', rank: 'r08', value: 8}, 
    { suit: 'spades', rank: 'r08', value: 8}, { suit: 'clubs', rank: 'r08', value: 8},
    { suit: 'diamonds', rank: 'r09', value: 9}, { suit: 'hearts', rank: 'r09', value: 9}, 
    { suit: 'spades', rank: 'r09', value: 9}, { suit: 'clubs', rank: 'r09', value: 9},
    { suit: 'diamonds', rank: 'r10', value: 10}, { suit: 'hearts', rank: 'r10', value: 10}, 
    { suit: 'spades', rank: 'r10', value: 10}, { suit: 'clubs', rank: 'r10', value: 10},
    { suit: 'diamonds', rank: 'J', value: 10}, { suit: 'hearts', rank: 'J', value: 10}, 
    { suit: 'spades', rank: 'J', value: 10}, { suit: 'clubs', rank: 'J', value: 10},
    { suit: 'diamonds', rank: 'Q', value: 10}, { suit: 'hearts', rank: 'Q', value: 10}, 
    { suit: 'spades', rank: 'Q', value: 10}, { suit: 'clubs', rank: 'Q', value: 10},
    { suit: 'diamonds', rank: 'K', value: 10}, { suit: 'hearts', rank: 'K', value: 10}, 
    { suit: 'spades', rank: 'K', value: 10}, { suit: 'clubs', rank: 'K', value: 10},
    { suit: 'diamonds', rank: 'A', value: 11}, { suit: 'hearts', rank: 'A', value: 11}, 
    { suit: 'spades', rank: 'A', value: 11}, { suit: 'clubs', rank: 'A', value: 11}
]

const playerCards = []

let rand_index, temp

let playerTotal = 0;

let dealerTotal = 0;

$buttonEl = $('.start-btn')
$h1El = $('h1')
$playerCardsEl = $(".playerCards")
$dealerCardsEl = $('.dealerCards')

$buttonEl.click(function(evt) {
    init()
});

function init() {
    $buttonEl.remove()
    $h1El.text('')
    render()
}

function render() {
    shuffle(cards)
    drawPlayerCards()
    drawDealerCards()
}

function drawPlayerCards() {
    playerAddCards()
    playerAddCards()
    blackjack()    
    
}

function drawDealerCards() {
    flippedCard = $("<h2 class='dcard'></h2>").addClass('card back-red')
    $dealerCardsEl.append(flippedCard)
    dealerAddCards() 
    addChoice()
    
}

function addChoice() {
    hitBtn = $("<button class='hit-btn'>Hit</button>")
    stayBtn = $("<button class='stay-btn'>Stay</button>")
    $('body').append(hitBtn, stayBtn)
    Hit()
    Stay()
}

function playerAddCards() {
    let newCard = $("<h2 class='pcard'></h2>").addClass('card ' + cards[0].suit + ' ' + cards[0].rank)
    $playerCardsEl.append(newCard)
    playerCards.unshift(cards.shift())
    ace()
    playerTotal += playerCards[0].value
}

function dealerAddCards() {
    let newCard2 = $("<h2 class='dcard'></h2>").addClass('card ' + cards[0].suit + ' ' + cards[0].rank)
    $dealerCardsEl.append(newCard2)
    dealerTotal += cards[0].value
    cards.shift()
}
function Hit() {
    hitBtn.click(function(evt) {
        if (playerTotal <= 21) {
        playerAddCards()
        } else if (playerTotal > 21) {
            hitBtn.remove()
        }
        bust()
    })
}

function Stay() {
    stayBtn.click(function(evt) {
        flippedCard.remove()
        dealerAddCards()
        while (dealerTotal < 16) {
        dealerAddCards()
        }
        stayBtn.remove()
        hitBtn.remove()
        push()
        win()
        lose()
    })
}

function win() {
    if (playerTotal > dealerTotal && playerTotal < 22) {
        $h1El.text('You Win!')
    } else if (dealerTotal > 21 && !bust()) {
        $h1El.text('You Win!')
    }
}

function lose() {
    if (dealerTotal > playerTotal && dealerTotal < 22) {
        $h1El.text('You Lose!')
    }
}

function bust() {
    if (playerTotal > 21) {
        $h1El.text('Bust!')
        stayBtn.remove()
    }
}

function push() {
    if (dealerTotal === playerTotal) {
        $h1El.text('Push!')
    }
}

function ace() {
    playerCards.forEach(function(playerCard) {
        if (playerCard.value === 11 && playerTotal > 11) {
            playerCard.value = 1
        }
    })
}

function blackjack() {
    if (playerTotal === 21) {
        $h1El.text('21!')
    }
}

function rndNumber(min, max) {
   return Math.floor(Math.random() * (max - min) ) + min;
}

function shuffle() {
    for (let lastIndex = cards.length - 1; lastIndex > 0; lastIndex--) {
       rand_index = rndNumber(0, lastIndex)
       temp = cards[lastIndex]
       cards[lastIndex] = cards[rand_index]
       cards[rand_index] = temp
    }
}
