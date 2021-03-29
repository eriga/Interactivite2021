<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/validator/13.5.2/validator.min.js" integrity="sha512-vZEoK8xRncku4g5GANHh5zobUjeCMbZkSEahrADeAcRlk/1Ignf8sAKojkV4RZLkPw145+ILJFisI2pnjsPtGQ==" crossorigin="anonymous"></script>
        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }

            .message, .erreur {
                display: none;
            }

            #erreur {
                font-weight: bold;
                color: red;
            }

            #message {
                font-weight: bold;
                color: green;
            }


        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">

            <div class="content">
                <div class="title m-b-md">
                    Validation
                </div>

                <div class="links ">
                <div class="formulaire">
                    <form action="#" method="post" name="ajoutChanson">
                        <p>Ajouter une chanson</p>
                        <div>
                        <input type="text" name="titre" id="titre" placeholder="Titre"/>
                        <input type="text" name="album" id="album" placeholder="Album"/>
                        <input type="number" name="annee" id="annee" placeholder="Année"/>
                        <select name="categorie">
                            <option value=""></option>
                            <option value="rock">Rock'n roll</option>
                            <option value="indie">Indie</option>
                            <option value="jazz">Jazz</option>
                            <option value="punk-rock">Punk Rock</option>
                        </select>
                        <input type="url" name="image">
                        </div>            
                        <div>
                        <input type="submit" value="Ajouter">
                        </div>            
                    </form>
                    </div>
                    <div class="message">
                    <p id="message"></p>
                    </div>
                    <div class="erreur">
                    <p id="erreur"></p>
                    </div>
                </div>
            </div>
        </div>
<script src="validation.js"></script>

    </body>
</html>
