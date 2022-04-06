let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];

//libreria per icone
//https://html-css-js.com/html/character-codes/

//array in cui andranno due carte per essere confrontate
let arrayComparison = [];

//inizio partita
document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
var interval; 
let cardFind = document.getElementsByClassName('find');
let modal = document.getElementById('modal');
let timer = document.querySelector(".timer");



//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain(){
    let modal = document.getElementById('modal');
    modal.classList.remove('active');
    startGame();
}

function startGame() {
    // la funzione startGame che pulisce il timer
    clearInterval(interval);
    //dichiara un array vuoto
    arrayComparison = [];

    // mescola casualmente l'array degli animali (var arrayShuffle = shuffle(arrayAnimali);)
    let arrayPartita = shuffle(arrayAnimali);
    
    //aggancia il contenitore con id griglia, 
    let griglia = document.getElementById('griglia');

    // pulisce tutti gli elementi che eventualmente contiene
    griglia.innerHTML = '';

    // poi fa ciclo per creare i 24 div child
    for(let i = 0; i < 24; i++) {
        let card = document.createElement('div');
        let cardIcon = document.createElement('div');
        griglia.appendChild(card).appendChild(cardIcon);

        // -> aggiunge la class 
        cardIcon.classList.add('icon');

        //e l'elemento dell'array in base all'indice progressivo
        cardIcon.innerHTML = arrayPartita[i];
    }

    // chiama la funzione timer
    timerPartita();


    //e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definite sotto
    var icons = document.getElementsByClassName("icon");

    for(let i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', displayIcon);
        icons[i].addEventListener('click', congratulations);
    }
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");

    //aggiunge l'oggetto su cui ha cliccato all'array del confronto 
    if(this.classList.contains('show')) {
        arrayComparison.push(this);
    } else {
        arrayComparison.shift();
    }
    
    console.log(arrayComparison);
    console.log(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < cardFind.length; i++) {
                        cardFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function congratulations() {
    if(cardFind.length == 24) {
        clearInterval(interval);
        modal.classList.add('active');
        document.getElementById('tempoTrascorso').innerHTML = timer.innerHTML;
        closeAndStartOver();
    }
}

// una funzione che nasconde la modale alla fine e riavvia il gioco
function closeAndStartOver(){
    let buttonModal = document.querySelector('#modal .content .button');
    buttonModal.addEventListener('click', function(){
        modal.classList.remove('active');
        startGame();
    });
}

// una funzione che calcola il tempo e aggiorna il contenitore sotto
function timerPartita() {
    let secondi = 0;
    let minuti = 0;
    let ore = 0;

    interval = setInterval(function() {
        //output nel contenitore timer
        timer.innerHTML = `Tempo: ${ore} ore ${minuti} minuti ${secondi}`;

        if(secondi < 59) {
            secondi++; 
        } else {
            secondi = 0;
            minuti++;
        }
        
        if (minuti == 60) {
            minuti = 0;
            ore++; 
        }
    }, 1000);
}