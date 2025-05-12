'use strict';

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
var game;
var level;
var pointDamage;

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

/********** ALÉATOIRE ********/
function throwDice(dices, sides) {
    let sum = 0;
    for (let i = 0; i < dices; i++) {
        sum += Math.floor(Math.random() * sides) + 1;
    }
    console.log("La somme finale : " + sum);
    return sum;
}

/******* POINT DE VIE *****************/
function GetPV() {
    game = {};
    game.round = 1;

    game.level = parseInt(prompt('Donnez le niveau : 1. Facile 2. Moyenne 3. Difficile', '1'), 10);

    if (game.level === 1) {
        game.PvDragon = 100 + throwDice(5, 10);
        game.PvPlayer = 100 + throwDice(10, 10);
    } else if (game.level === 2) {
        game.PvDragon = 100 + throwDice(10, 10);
        game.PvPlayer = 100 + throwDice(10, 10);
    } else if (game.level === 3) {
        game.PvDragon = 100 + throwDice(10, 10);
        game.PvPlayer = 100 + throwDice(7, 10);
    } else {
        console.error("Niveau invalide !");
        return;
    }

    console.log('PV du dragon : ' + game.PvDragon + ', PV du joueur : ' + game.PvPlayer);
}

/******** AFFICHAGE ***********/
function ShowStart() {
    document.write('<div class="game-state">');
    document.write('<figure class="game-state_player"><img src="images/knight.png" alt="Chevalier">');
    if (game.PvPlayer > 0) {
        document.write('<figcaption>' + game.PvPlayer + ' PV</figcaption></figure>');
    } else {
        document.write('<figcaption>GAME OVER</figcaption></figure>');
    }

    document.write('<figure class="game-state_player">');
    document.write('<img src="images/dragon.png" alt="Dragon">');
    if (game.PvDragon > 0) {
        document.write('<figcaption>' + game.PvDragon + ' PV</figcaption></figure>');
    } else {
        document.write('<figcaption>GAME OVER</figcaption></figure>');
    }
    document.write('</div>');
}

function showTour(attack) {
    document.write('<h3>Tour n°' + game.round + '</h3>');
    document.write('<figure class="game-round">');

    if (!attack) {
        document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
        document.write('<figcaption>Le dragon prend l\'initiative, vous attaque et vous inflige ' + pointDamage + ' points de dommage !</figcaption>');
    } else {
        document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
        document.write('<figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ' + pointDamage + ' points de dommage !</figcaption>');
    }
    document.write('</figure>');
    ShowStart();
}

function gameLoop() {
    while (game.PvPlayer > 0 && game.PvDragon > 0) {
        let attack = GetAttacker();
        pointDamage = calculateDamage(attack);
        showTour(attack);
        game.round++;
    }
}

/*********** QUI ATTAQUE LE PREMIER **************/
function GetAttacker() {
    let dragonRoll = throwDice(10, 6);
    let playerRoll = throwDice(10, 6);
    console.log("Dragon : " + dragonRoll + ", Player : " + playerRoll);
    return playerRoll >= dragonRoll;
}

/******** CALCUL POINT DE DAMAGE DE PLAYER ET DRAGON ********************/
function calculateDamage(attack) {
    if (!attack) {
        pointDamage = damageDragon();
        game.PvPlayer -= pointDamage;
    } else {
        pointDamage = damagePlayer();
        game.PvDragon -= pointDamage;
    }
    console.log("PV Dragon : " + game.PvDragon + ", PV Player : " + game.PvPlayer);
    return pointDamage;
}

/********** CALCUL POINT DE DOMMAGE PLAYER **********************************/
function damagePlayer() {
    let damage = throwDice(3, 6);
    if (game.level === 1) {
        damage = Math.round(damage + (damage * throwDice(2, 6) / 100));
    } else if (game.level === 3) {
        damage = Math.round(damage - (damage * throwDice(1, 6) / 100));
    }
    console.log("Dommage infligé par le joueur : " + damage);
    return damage;
}

/************** CALCUL POINT DE DOMMAGE DRAGON *********************/
function damageDragon() {
    let damage = throwDice(3, 6);
    if (game.level === 1) {
        damage = Math.round(damage - (damage * throwDice(2, 6) / 100));
    } else if (game.level === 3) {
        damage = Math.round(damage + (damage * throwDice(1, 6) / 100));
    }
    console.log("Dommage infligé par le dragon : " + damage);
    return damage;
}

/***************************** GAGNANT *****************/
function winner() {
    if (game.PvDragon > 0) {
        document.write('<footer><h3>Fin de la partie</h3><figure class="game-end"><figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption><img src="images/dragon-winner.png" alt="Dragon vainqueur"></figure></footer>');
    } else {
        document.write('<footer><h3>Fin de la partie</h3><figure class="game-end"><figcaption>Vous avez vaincu le dragon, vous êtes un héros !</figcaption><img src="images/knight-winner.png" alt="Chevalier vainqueur"></figure></footer>');
    }
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
console.clear();
GetPV();
ShowStart();
gameLoop();
winner();
