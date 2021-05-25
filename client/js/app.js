let socket = io('http://localhost:3010');

//Connexion au serveur
socket.on('connect', function(){
    console.log("Connexion réussie au serveur!");
});

// Déconnexion du serveur
socket.on('disconnect', function () {
    console.log("Déconnecté!");
});

socket.on('cercleAutre', function (e) {// data -> e
    circle(e.x, e.y, e.dia);    
}); 

socket.on('ligneAutre', function (e) {// data -> e
    strokeWeight(e.epaisseur);
    stroke(e.couleur);
    line(e.x, e.y, e.oldX, e.oldY);    
}); 






// DESSIN

let oldX = null;
let oldY = null;

let epaisseur = 5;
let couleur = "#ff0000";


window.setup = () => {
    createCanvas(window.innerWidth, window.innerHeight);

    document.addEventListener('mousemove', (e) => {
        //console.log(e);        
        if(e.buttons != 0){
            let x = e.clientX;
            let y = e.clientY;
            let dia = 20;

            //circle(x, y, dia);
            strokeWeight(epaisseur);
            stroke(couleur);
            line(x, y, oldX, oldY);

            // Émission des informations (sens unique vers le serveur)
            // socket.emit('cercle', {
            //     x: x,
            //     y: y,
            //     dia: dia,            
            // })            

            socket.emit('ligne', {
                x: x,
                y: y,
                oldX: oldX,
                oldY: oldY,
                epaisseur: epaisseur,
                couleur: couleur
            });

        }

        oldX = e.clientX;
        oldY = e.clientY;


    });
}