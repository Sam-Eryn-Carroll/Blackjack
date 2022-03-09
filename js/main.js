/*----- constants -----*/
// const over21 = playerScore > 21 || dealerScore > 21;
// const dealerStop = dealerScore > 16;
const cards = [
    'card diamonds r02', 'card hearts r02', 'card spades r02', 'card clubs r02',
    'card diamonds r03', 'card hearts r03', 'card spades r03', 'card clubs r03',
    'card diamonds r04', 'card hearts r04', 'card spades r04', 'card clubs r04',
    'card diamonds r05', 'card hearts r05', 'card spades r05', 'card clubs r05',
    'card diamonds r06', 'card hearts r06', 'card spades r06', 'card clubs r06',
    'card diamonds r07', 'card hearts r07', 'card spades r07', 'card clubs r07',
    'card diamonds r08', 'card hearts r08', 'card spades r08', 'card clubs r08',
    'card diamonds r09', 'card hearts r09', 'card spades r09', 'card clubs r09',
    'card diamonds r10', 'card hearts r10', 'card spades r10', 'card clubs r10',
    'card diamonds J', 'card hearts J', 'card spades J', 'card clubs J',
    'card diamonds Q', 'card hearts Q', 'card spades Q', 'card clubs Q',
    'card diamonds K', 'card hearts K', 'card spades K', 'card clubs k',
    'card diamonds A', 'card hearts A', 'card spades A', 'card clubs A'
]
let score;
/*----- app's state (variables) -----*/
let playerScore, dealerScore, blackjack, money;
/*----- cached element references -----*/
$buttonEl = $('.start-btn');
$h1El = $('h1');
let betText = $('<label for="bet-amount"></label>').html("Bet Amount: ")
let betText2 = $('<input type="text" id="bet-amount" name="bet-amount">')
/*----- event listeners -----*/
$buttonEl.click(function(evt) {
    init();
});
let cards2 = []
$playerCards = $(".playerCards");
/*----- functions -----*/
function init() {
    blackjack = null;
    money = 200;
    render();
}

function render() {
    bet()  
    betText2.keypress(function(evt) {
        if(evt.keyCode === 13) {
            $h1El.remove()
            betText.remove()
            betText2.remove()
            drawTwoCards()
        }
    });
}

function bet() {
    $h1El.text("Place Bet");
    $buttonEl.remove()
    $('body').append(betText, betText2)
    betText.css({"bottom": "30px", "position": "absolute"})
    betText2.css({"bottom": "10px", "position": "absolute", "border": "2px solid crimson"})
    
}

function drawTwoCards() {

    $dealerCards = $('.dealerCards');
    betText.remove()
    betText2.remove()
    shuffle(cards)
    playerCard1 = $("<h2 class='pcard1'></h2>").addClass('card hearts r02')
    playerCard2 = $("<h2 class='pcard2'></h2>").addClass(cards[1])
    dealerCard1 = $("<h2 class='pcard3'</h2>").addClass('card back-red')
    dealerCard2 = $("<h2 class='pcard4 cards[3]'</h2>").addClass(cards[3])
    $dealerCards.append(dealerCard1, dealerCard2)
    $playerCards.append(playerCard1, playerCard2)
    hitBtn = $("<button class='hit-btn'>Hit</button>")
    stayBtn = $("<button class='stay-btn'>Stay</button>")
    splitBtn = $("<button class='split-btn'>Split</button>")
    $('body').append(hitBtn, stayBtn, splitBtn)
    Hit()
    if('h2' === 'card hearts r02'){
        value = 2;
        score += value;
    };
        
    
}

function Hit() {
    hitBtn.click(function(evt) {
    playerCard3 = $("<h2 class='pcard3'></h2>").addClass(cards[4])
    $playerCards.append(playerCard3)
    })
}

function Stay() {
    stayBtn.click(function(evt) {
        dealerCard1.removeClass('card back-red').addClass(cards[2])
       
            dealerCard3 = $("<h2 class='pcard3'></h2>").addClass(cards[5])
            $dealerCards.append(dealerCard3)
        
    })
}

function Split() {

}

function rndNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
let rand_index;
let temp;
 function shuffle() {
  for (let lastIndex = cards.length - 1; lastIndex > 0; lastIndex--) {
       rand_index = rndNumber(0, lastIndex);
       temp = cards[lastIndex];
       cards[lastIndex] = cards[rand_index];
       cards[rand_index] = temp;
       
       
   }
   console.log(cards)
}