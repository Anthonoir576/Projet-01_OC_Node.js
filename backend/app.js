
/* *** 01 *** */
/* Importation de express */
const express = require('express');

/* Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande. Il nous faudra le package body-parser . Installez-le en tant que dépendance de production à l'aide de npm : Importez-le dans votre fichier app.js : */
const bodyParser = require('body-parser');

/* *** 02 *** */
/* Notre application */
const app = express();


/* *** 03 *** */
/* ###### MIDDLEWARE ###### */
/* Réponse pour le moment pour tous type de requete effectuer sur celle-ci */
/* 1ere argument la requete, le 2eme la reponse, la 3eme next, qui permet de passé au prochain middleware .*/

/* Rajout d'un middleware c'est le premier executer par le serveur, middleware general on ne met pas de route specifique il serra donc appliquer a toute les requetes a notre serveur 
le premier header permet de donner l'acces a lapi a tous le monde, on autorise laccest a certain header, ainsi que les methodes utilisé. cela aura pour effet de d'autorisé lacces a l'application d'acceder a lapi sans probleme  ne pas oublier dappeler next, pour effectuer le prochain middleware */

/* 
    Ces headers permettent :

    d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;

    d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;

    d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

    Comme vous pouvez le voir dans le code, le middleware ne prend pas d'adresse en premier paramètre afin de s'appliquer à toutes les routes. Cela permettra à toutes les demandes de toutes les origines d'accéder à votre API. Vous pouvez également ajouter des URL d'images valides aux stuff renvoyés par l'API, en terminant la route GET. Si vous actualisez à présent l'application front-end, vous devriez voir vos articles en vente : 
*/
app.use((request, response, next) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methodes', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();

});

/* Enfin, définissez sa fonction json comme middleware global pour votre application, juste après avoir défini les headers de la réponse : */
app.use(bodyParser.json());

/* Maintenant, body-parser a analysé le corps de la demande. Au lieu de l'écrire dans un middleware .use() qui traiterait toutes les requêtes, nous allons l'écrire dans un.post() qui ne traitera que les requêtes de type POST : */
app.post('/api/stuff', (request, response, next) => {

    console.log(request.body);
    response.status(201).json({
        message: 'Objet créé !'
    });

});

/* /api/stuff serra la route de l'api, l'url de l'appli front va faire une requete a cette url la . a sont extention. il renverra un code 200 si la reponse est reussite en json de l'array stuff */
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
});


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;