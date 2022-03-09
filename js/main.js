/*----- constants -----*/
// const over21 = playerScore > 21 || dealerScore > 21;
// const dealerStop = dealerScore > 16;
const cards = [
    { suit: 'diamonds', rank: 'r02', value: 2}, { suit: 'hearts', rank: 'r02', value: 2}, 
    { suit: 'spades', rank: 'r02', value: 2}, { suit: 'clubs', rank: 'r02', value: 2},
    { suit: 'diamonds', rank: 'r03', value: 3}, { suit: 'hearts', rank: 'r03', value: 3},
    { suit: 'spades', rank: 'r03', value: 3}, { suit: 'clubs', rank: 'r03', value: 3},
    { suit: 'diamonds', rank: 'r04', value: 4}, { suit: 'hearts', rank: 'r04', value: 4}, 
    { suit: 'spades', rank: 'r04', value: 4}, { suit: 'clubs', rank: 'r04', value: 4},
    { suit: 'diamonds', rank: 'r05', value: 5}, { suit: 'hearts', rank: 'r05', value: 4}, 
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
    { suit: 'diamonds', rank: 'A', value: 1}, { suit: 'hearts', rank: 'A', value: 1}, 
    { suit: 'spades', rank: 'A', value: 1}, { suit: 'clubs', rank: 'A', value: 1}
]



let score;
/*----- app's state (variables) -----*/
let money;
let playerTotal = 0;
let dealerTotal = 0;
/*----- cached element references -----*/
$buttonEl = $('.start-btn');
$h1El = $('h1');
$playerCards = $(".playerCards");
$dealerCards = $('.dealerCards');
let betText = $('<label for="bet-amount"></label>').html("Bet Amount: ")
let betText2 = $('<input type="text" id="bet-amount" name="bet-amount">')
/*----- event listeners -----*/
$buttonEl.click(function(evt) {
    init();
});
betText2.keypress(function(evt) {
    if(evt.keyCode === 13) {
        $h1El.text('')
        betText.remove()
        betText2.remove()
        shuffle(cards)
        drawPlayerCards()
        drawDealerCards()
    }
});
/*----- functions -----*/
function init() {
    blackjack = null;
    money = 200;
    render();
}

function render() {
    bet()   
}

function bet() {
    $h1El.text("Place Bet");
    $buttonEl.remove()
    $('body').append(betText, betText2)
    betText.css({"bottom": "30px", "position": "absolute"})
    betText2.css({"bottom": "10px", "position": "absolute", "border": "2px solid crimson"})
}

function drawPlayerCards() {
    playerAddCards()
    playerAddCards()
    
}

function drawDealerCards() {
    flippedCard = $("<h2 class='pcard2'></h2>").addClass('card back-red')
    $dealerCards.append(flippedCard)
    dealerAddCards() 
    addChoice()
}

function addChoice() {
    hitBtn = $("<button class='hit-btn'>Hit</button>")
    stayBtn = $("<button class='stay-btn'>Stay</button>")
    splitBtn = $("<button class='split-btn'>Split</button>")
    $('body').append(hitBtn, stayBtn, splitBtn)
    Hit()
    Stay()
}

function playerAddCards() {
    let x = $("<h2 class='pcard2'></h2>").addClass('card ' + cards[0].suit + ' ' + cards[0].rank)
    $playerCards.append(x);
    playerTotal += cards[0].value
    cards.shift()
}

function dealerAddCards() {
    let x = $("<h2 class='pcard1'></h2>").addClass('card ' + cards[0].suit + ' ' + cards[0].rank)
    $dealerCards.append(x);
    dealerTotal += cards[0].value
    cards.shift()
}
function Hit() {
    hitBtn.click(function(evt) {
        if (playerTotal <= 21) {
        playerAddCards()
        splitBtn.remove()
        } else if (playerTotal > 21) {
            hitBtn.remove()
        }
    })
}

function Stay() {
    stayBtn.click(function(evt) {
        flippedCard.remove()
        dealerAddCards()
        if (dealerTotal < 16) {
        dealerAddCards()
        }
        stayBtn.remove()
        hitBtn.remove()
        splitBtn.remove()
        bust()
        win()
        push()
    })
}

function Split() {
    
    splitBtn.click(function(evt) {

    })
}

function win() {
    if (22 > playerTotal > dealerTotal) {
        $h1El.text('You Win!')
    } else if (dealerTotal > 21) {
        $h1El.text('You Win!')
    }
}

function bust() {
    if (22 > dealerTotal > playerTotal) {
        $h1El.text('You Lose!')
    } else if (playerTotal > 21) {
        $h1El.text('Bust!')
    }
}

function push() {
    if (dealerTotal === playerTotal) {
        $h1El.text('Push!')
    }
}

function blackjack() {
    if (playerTotal === 21) {
        $h1El.text('21!')
    } else {}
}

function rndNumber(min, max) {
   return Math.floor(Math.random() * (max - min) ) + min;
}
let rand_index
let temp
 function shuffle() {
    for (let lastIndex = cards.length - 1; lastIndex > 0; lastIndex--) {
       rand_index = rndNumber(0, lastIndex);
       temp = cards[lastIndex];
       cards[lastIndex] = cards[rand_index];
       cards[rand_index] = temp;
    }
    console.log(cards)
}