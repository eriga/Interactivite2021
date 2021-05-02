/* =================================================
 * EXEMPLE Promise.all()
 * ====================================
 *
 * Pour faire plusieurs appels Fetch d'un seul coup, on peut
 * utiliser Promise.all().
 * 
 * Cette méthode prend un tableau en paramètre, qui contient les appels
 * fetch, et retourne évidemment une promesse (donc .then() doit suivre).
 *
 * Cet exemple servira pour le TP2 pour vous permettre de récupérer
 * des données de plusieurs subreddits et de traiter les réponses d'un seul coup.
 * 
 * IL N'EST PAS NÉCESSAIRE de faire ça de cette façon: ça ne permet au fond que 
 * réduire la quantité de code à écrire.
 * 
 * À noter que pour éviter d'écraser les réponses déjà faites à chaque nouvel appel,
 * la méthode getImages() doit AJOUTER la réponse à ce qui existe déjà
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 */
Promise.all([
    this.getImages("wallpaper"),
    this.getImages("landscape"),
    this.getImages("cats"),
]).then(() => {
    // ...
});
