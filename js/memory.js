document.addEventListener("DOMContentLoaded", () => {
    let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
    const numCards = 24;
    const griglia = document.getElementById('griglia');
    const modal = document.getElementById('modal');
    const timer = document.querySelector(".timer");

    let arrayComparison = [];
    let interval;

    // Mescola casualmente l'array degli animali
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Rimuove la classe 'show' da un elemento
    function removeShowClass(element) {
        element.classList.remove("show");
    }

    // Inizia una nuova partita
    function startGame() {
        clearInterval(interval);
        arrayComparison = [];
        const arrayPartita = shuffle(arrayAnimali);

        griglia.innerHTML = '';
        for (let i = 0; i < numCards; i++) {
            const card = document.createElement('div');
            const cardIcon = document.createElement('div');
            griglia.appendChild(card).appendChild(cardIcon);
            cardIcon.classList.add('icon');
            cardIcon.innerHTML = arrayPartita[i];

            cardIcon.addEventListener('click', () => {
                if (cardIcon.classList.contains('show')) {
                    return;
                }
                cardIcon.classList.add('show');
                arrayComparison.push(cardIcon);

                if (arrayComparison.length === 2) {
                    if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
                        arrayComparison.forEach((card) => {
                            card.classList.add("find", "disabled");
                        });
                        arrayComparison = [];
                    } else {
                        setTimeout(() => {
                            arrayComparison.forEach(removeShowClass);
                            arrayComparison = [];
                        }, 700);
                    }
                }
            });
        }

        timerPartita();
    }

    // Controlla se il gioco è completato
    function congratulations() {
        if (document.querySelectorAll('.find').length === numCards) {
            clearInterval(interval);
            modal.classList.add('active');
            document.getElementById('tempoTrascorso').innerHTML = timer.innerHTML;
            closeAndStartOver();
        }
    }

    // Nasconde la modale alla fine e riavvia il gioco
    function closeAndStartOver() {
        const buttonModal = document.querySelector('#modal .content .button');
        buttonModal.addEventListener('click', () => {
            modal.classList.remove('active');
            startGame();
        });
    }

    // Calcola il tempo e aggiorna il contenitore
    function timerPartita() {
        let secondi = 0;
        let minuti = 0;
        let ore = 0;

        interval = setInterval(() => {
            timer.innerHTML = `Tempo: ${ore} ore ${minuti} minuti ${secondi}`;
            if (secondi < 59) {
                secondi++;
            } else {
                secondi = 0;
                minuti++;
            }
            if (minuti === 60) {
                minuti = 0;
                ore++;
            }
            congratulations();
        }, 1000);
    }

    // Inizia il gioco al caricamento della pagina
    startGame();
});
