
/* ************ EXPRESS MONGOOSE(MangoDB) ************** */


/* *** 01 *** */
/* Importation de express */
const express = require('express');

/* Importation de mongoose */
const mongoose = require('mongoose');

/* Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande. Il nous faudra le package body-parser . Installez-le en tant que dépendance de production à l'aide de npm : Importez-le dans votre fichier app.js : */
const bodyParser = require('body-parser');

/* Pour pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier app.js */
const Thing = require('./models/thing');
const { response } = require('express');

/* Importation de la Bdd créer sur mongoDB nom dutilisateur et mot de passe. */
mongoose.connect("mongodb+srv://Anthonoir576:475719711993@bdd.t7znw.mongodb.net/Bdd?retryWrites=true&w=majority", {
   useNewUrlParser: true, useUnifiedTopology: true 
})
.then(() => console.log('Connection a mongoDB réussie !'))
.catch(() => console.log('Connection a mongoDB échouée !'));


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


/* ### POST ### */
/* Maintenant, body-parser a analysé le corps de la demande. Au lieu de l'écrire dans un middleware .use() qui traiterait toutes les requêtes, nous allons l'écrire dans un.post() qui ne traitera que les requêtes de type POST : */
app.post('/api/stuff', (request, response, next) => {

  /* on a besoin donc du titre de la description etc.. On aurait pu ecrire tous ca, mais le raccourci js '...' permet de faire la même chose En gros on copie les champs dans le body de la requet post. donc le title, description etc..  ON SUPPRIME l'id de la requete car il serra generé par mongoDB */

  /*  Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end). L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body Ce modèle comporte une méthode save() qui enregistre simplement votre Thing dans la base de données. La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things. La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , nous renverrons une réponse de réussite avec un code 201 de réussite. Dans notre bloc catch() , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400. */
  delete request.body._id;

  const thing = new Thing({

    ...request.body

  });

  /* Pour enregistrer cet objet dans la bdd. La methode save() enregistre l'objet dans la base et retourne un promise */
  thing.save()
  .then(() => response.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => response.status(400).json({error}));

});


/* ### GET ### */
/* /api/stuff serra la route de l'api, l'url de l'appli front va faire une requete a cette url la . a sont extention. Désormais, nous pouvons implémenter notre route GET afin qu'elle renvoie tous les Things dans la base de données */

/* ans l'exemple ci-dessus, nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données. À présent, si vous ajoutez un Thing , il doit s'afficher immédiatement sur votre page d'articles en vente.

En revanche, si vous cliquez sur l'un des Things , l'affichage d'un seul élément ne fonctionne pas. En effet, il tente d'effectuer un appel GET différent pour trouver un Thing individuel. Implémentons cette route maintenant. */
app.use('/api/stuff', (req, res, next) => {

  Thing.find()
  .then( things => res.status(200).json(things))
  .catch(error => res.status(400).json({error}));

});


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;





