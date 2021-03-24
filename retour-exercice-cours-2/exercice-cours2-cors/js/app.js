// L'URL à utiliser pour la requête POST
const url = "http://127.0.0.1:8000/api/heroes";

// Interception de la soumission du formulaire
document.forms.formHeros.addEventListener('submit', event => {
    event.preventDefault();

    //console.log('soumission interceptée!');
    //console.log(document.forms.formHeros.soumettre.value);

    /* Les informations du formulaire sont récupérées et envoyées dans la requête, 
     * mais elles ne serviront pas réellement dans l'API puisque les informations
     * y sont générées automatiquement (prenom, nom, age)
     */
    let data = document.forms.formHeros;
    let options = {
        method: 'POST',
        mode: 'cors',
        body: data
    }

    // On fait la requête en utilisant l'URL et les options
    fetch(url, options).then(reponse => {
        // La réponse retournée par l'API (Laravel) devrait être quelque chose comme [success: 'success']
        return reponse.json();
    }).then(json => {        
        console.log(json);
    });
});
