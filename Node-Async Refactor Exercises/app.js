/*
// Part 1 

let favNumber = 1;
let baseURL = "http://numbersapi.com";

async function getNumberFact(input){
    const res = await axios.get(`${baseURL}/${favNumber}?json`);
    console.log(res)
}

getNumberFact(favNumber);

// 1.2

let favNumbers = [2, 3, 4];

async function getNumberFact2(input){
    const res = await axios.get(`${baseURL}/${favNumbers}?json`);
    console.log(res)
}

getNumberFact2(favNumbers);


// 1.3

async function part1_3(){

    let facts = await Promise.all(Array.from({length: 4}, () =>
        axios.get(`${baseURL}/${favNumber}?json`))
        );
    facts.forEach(({data}) => {
        $('body').append(`<p>${data.text}</p>`)
    });
}

part1_3();

*/



// Part 2

// 2.1


let baseURL = 'https://deckofcardsapi.com/api/deck';


async function part2_1(){
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    let { suit, value } = res.data.cards[0];
    console.log(suit, value);
}

part2_1();


async function part2_2(){
    let firstCardResponse = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    let deckID = firstCardResponse.data.deck_id;
    let secondCardResponse = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);

    [firstCardResponse.data, secondCardResponse.data].forEach(card  => {
        let { suit, value } = card.cards[0];
        console.log(suit, value);
    })
}

part2_2();


async function part2_3(){
    
    // Get reference to button and card area on the DOM. 
    let $btn = $('button');
    let $cardArea = $('#card-area');

    // Get the newly shuffled deck. 
    let deckData = await axios.get(`${baseURL}/new/shuffle/`);

    // Add click event to show card. 
    $btn.show().on('click', async function(){
        
        // Draw a card and get its image. 
        let cardData = await axios.get(`${baseURL}/${deckData.data.deck_id}/draw/`);
        let cardImg = cardData.data.cards[0].image;
        
        // Positionining the card angle.
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;

        // Add card to the DOM. 
        $cardArea.append(
            $('<img>', {
                src: cardImg,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        )
        if (cardData.remaining === 0) $btn.remove();
    });
    
}

part2_3();
