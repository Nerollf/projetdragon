'use strict';

window.onload = function() {
    /*************************************************************************************************/
    /* **************************************** DONNEES JEU **************************************** */
    /*************************************************************************************************/
    var game;
    var pointDamage;

    /*************************************************************************************************/
    /* *************************************** FONCTIONS JEU *************************************** */
    /*************************************************************************************************/

    function throwDice(dices, sides) {
        let sum = 0;
        for (let i = 0; i < dices; i++) {
            sum += Math.floor(Math.random() * sides) + 1;
        }
        console.log("La somme finale : " + sum);
        return sum;
    }

    function GetPV() {
        game = {};
        game.round = 1;

        do {
            game.level = parseInt(prompt('Donnez le niveau : 1. Facile 2. Moyenne 3. Difficile', '1'), 10);
        } while (![1, 2, 3].includes(game.level));

        if (game.level === 1) {
            game.PvDragon = 100 + throwDice(5, 10);
            game.PvPlayer = 100 + throwDice(10, 10);
        } else if (game.level === 2) {
            game.PvDragon = 100 + throwDice(10, 10);
            game.PvPlayer = 100 + throwDice(10, 10);
        } else if (game.level === 3) {
            game.PvDragon = 100 + throwDice(10, 10);
            game.PvPlayer = 100 + throwDice(7, 10);
        }

        console.log('PV du dragon : ' + game.PvDragon + ', PV du joueur : ' + game.PvPlayer);
    }

    function ShowStart() {
        let content = '<div class="game-state">';
        content += '<figure class="game-state_player"><img src="images/knight.png" alt="Chevalier">';
        content += game.PvPlayer > 0 ? '<figcaption>' + game.PvPlayer + ' PV</figcaption></figure>' : '<figcaption>GAME OVER</figcaption></figure>';

        content += '<figure class="game-state_player">';
        content += '<img src="images/dragon.png" alt="Dragon">';
        content += game.PvDragon > 0 ? '<figcaption>' + game.PvDragon + ' PV</figcaption></figure>' : '<figcaption>GAME OVER</figcaption></figure>';
        content += '</div>';

        document.getElementById('game').insertAdjacentHTML('beforeend', content);
    }

    function showTour(attack) {
        let content = '<h3>Tour n°' + game.round + '</h3>';
        content += '<figure class="game-round">';

        if (!attack) {
            content += '<img src="images/dragon-winner.png" alt="Dragon vainqueur">';
            content += '<figcaption>Le dragon prend l\'initiative, vous attaque et vous inflige ' + pointDamage + ' points de dommage !</figcaption>';
        } else {
            content += '<img src="images/knight-winner.png" alt="Chevalier vainqueur">';
            content += '<figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ' + pointDamage + ' points de dommage !</figcaption>';
        }
        content += '</figure>';

        document.getElementById('game').insertAdjacentHTML('beforeend', content);
        ShowStart();
    }

    function winner() {
        let content = '<footer><h3>Fin de la partie</h3><figure class="game-end">';
        if (game.PvDragon > 0) {
            content += '<figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption><img src="images/dragon-winner.png" alt="Dragon vainqueur">';
        } else {
            content += '<figcaption>Vous avez vaincu le dragon, vous êtes un héros !</figcaption><img src="images/knight-winner.png" alt="Chevalier vainqueur">';
        }
        content += '</figure></footer>';

        document.getElementById('game').insertAdjacentHTML('beforeend', content);
    }

    function gameLoop() {
        while (game.PvPlayer > 0 && game.PvDragon > 0) {
            let attack = GetAttacker();
            pointDamage = calculateDamage(attack);
            showTour(attack);
            game.round++;
        }
    }

    function GetAttacker() {
        let dragonRoll = throwDice(10, 6);
        let playerRoll = throwDice(10, 6);
        console.log("Dragon : " + dragonRoll + ", Player : " + playerRoll);
        return playerRoll >= dragonRoll;
    }

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

    /*************************************************************************************************/
    /* ************************************** CODE PRINCIPAL *************************************** */
    /*************************************************************************************************/
    console.clear();
    document.getElementById('game').innerHTML = ''; // Nettoyage
    GetPV();
    ShowStart();
    gameLoop();
    winner();
};
