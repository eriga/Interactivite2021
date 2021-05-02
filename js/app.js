// Informations OAuth pour se connecter avec Google

let client = new jso.JSO({
    provider_id: "google",

    // Vient de la console Google
    // Cet id est à modifier en fonction du client utilisé
    client_id: "",

    // Redirection vers l'adresse de retour
    // Cet URL est à modifier selon la structure du projet local
    redirect_uri: "",

    // Adresse de connexion à OAuth
    authorization: "https://accounts.google.com/o/oauth2/auth",

    // Liste des permissions demandées à l'utilisateur
    scopes: {
        request: [
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/userinfo.profile",
        ]
    }
});

// Nécessaire à JSO
client.callback();

// Récupération de l'access token (jeton d'accès)
client.getToken().then(token => {
    // Avec l'access_token, on appelle la fonction drive() qui fera les actions nécessaires    
    drive(token.access_token);
});


function drive(access_token){
    // Création d'un fichier test
    create_drive_file("FichierTest1.txt", "Ceci est un test", access_token)
        .then(rep => {
            console.log("Le fichier 1 a été créé!");
        });

    create_drive_file("FichierTest2.txt", "Ceci est un deuxième test", access_token)
        .then(rep => {
            console.log("Le fichier 2 a été créé!");
        });
}




function create_drive_file(name, content, access_token) {
    const upload_url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media";
    const upload_options = {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'text/plain', // le contenu sera du texte
            'Authorization': 'Bearer ' + access_token, //autorisation de l'utilisateur
        },
        body: content
    };

    return fetch(upload_url, upload_options)
            .then(resp => {
                return resp.json().then(fichier => {                    
                    const metadata_url = "https://www.googleapis.com/drive/v3/files/" + fichier.id;
                    const metadata_options = {
                        method: "PATCH",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json', // le contenu sera un json
                            'Authorization': 'Bearer ' + access_token, //autorisation de l'utilisateur
                        },
                        body: JSON.stringify({ name: name })
                    }

                    return fetch(metadata_url, metadata_options)
                            .then(resp => {
                                return resp.json();
                            })
                })
            })
}