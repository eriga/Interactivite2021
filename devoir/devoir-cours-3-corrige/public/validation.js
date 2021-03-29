
document.forms.ajoutChanson.addEventListener('submit', event => {
    event.preventDefault();
    let titre = document.forms.ajoutChanson.titre.value;
    let album = document.forms.ajoutChanson.album.value;
    let annee = document.forms.ajoutChanson.annee.value;
    let categorie = document.forms.ajoutChanson.categorie.value;
    let image = document.forms.ajoutChanson.image.value;

    // RESET MESSAGE
    afficherErreur(null);

    // VALIDATION
    if (validator.isEmpty(titre) && !validator.isAlphanumeric(titre)) {
        afficherErreur("Le titre doit être fourni et être une valeur alphanumérique");
        return;
    }

    if (validator.isEmpty(album) && !validator.isAlphanumeric(album)) {
        afficherErreur("L'album doit être fourni et être une valeur alphanumérique");
        return;
    }

    if (validator.isEmpty(annee) && !validator.isInt(annee)) {
        afficherErreur("L'année doit être fournie et être une valeur numérique entière");
        return;
    }

    /**
     * Envoi des données
     */
    const url = 'http://127.0.0.1:8000/api/chansons';
    // Data
    const data = {
        titre,
        album,
        annee,
        categorie,
        image
    }

    console.log(data);

    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(url, options).then(reponse => {
        return reponse;
    }).then(() => {
        afficherSucces("La chanson a été ajoutée!");
    })

});

/**
 * Affiche un message d'erreur de validation
 * 
 * @param {string} message 
 */
function afficherErreur(message) {
    let el = document.querySelector('.erreur');
    if (message != null) {
        el.style.display = "block";
        document.querySelector('.message').style.display = "none";
    } else {
        el.style.display = "none";
    }

    document.querySelector('#erreur').innerHTML = message;
}

/**
 * Affiche un message confirmant l'ajout de la chanson
 *
 * @param {string} message
 */
function afficherSucces(message) {
    afficherErreur(null);
    let el = document.querySelector('.message');

    el.style.display = "block";
    document.forms.ajoutChanson.style.display = "none";

    document.querySelector('#message').innerHTML = message;
}

