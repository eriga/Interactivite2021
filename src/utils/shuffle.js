export default function shuffle(tab) {
    let indexCourant = tab.length, tempVal, indexRandom;

    // Tant qu'il reste des éléments à mélanger
    while (0 !== indexCourant) {

        // Récupérer un élément au hasard
        indexRandom = Math.floor(Math.random() * indexCourant);
        indexCourant -= 1;

        // Switch avec l'élément courant
        tempVal = tab[indexCourant];
        tab[indexCourant] = tab[indexRandom];
        tab[indexRandom] = tempVal;
    }

    return tab;
}