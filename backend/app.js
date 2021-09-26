
/* ************ EXPRESS MONGOOSE(MangoDB) ************** */


/* *** 01 *** */
/* Importation de express */
const express = require('express');
/* Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande. Il nous faudra le package body-parser . Installez-le en tant que dépendance de production à l'aide de npm : Importez-le dans votre fichier app.js : */
const bodyParser = require('body-parser');
/* Importation de mongoose */
const mongoose = require('mongoose');

/* Importation des middlewares des objets dans un fichier séparé */
const stuffRoutes = require('./routes/stuff');
/* Importantion des middlewares User */
const userRoutes = require('./routes/user');

/* Importation de la Bdd créer sur mongoDB nom dutilisateur et mot de passe de la Bdd  */
mongoose.connect("mongodb+srv://Anthonoir576:475719711993@bdd.t7znw.mongodb.net/Bdd?retryWrites=true&w=majority", {
   useNewUrlParser: true, useUnifiedTopology: true 
})
.then(() => console.log('Connection a mongoDB réussie !'))
.catch(() => console.log('Connection a mongoDB échouée !'));


/* *** 02 *** */
/* Notre application */
const app = express();


/* *** 03 *** */
/* CORS Ces headers permettent : d'accéder à notre API depuis n'importe quelle origine ( '*' ) ; d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ; d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.). Comme vous pouvez le voir dans le code, le middleware ne prend pas d'adresse en premier paramètre afin de s'appliquer à toutes les routes. Cela permettra à toutes les demandes de toutes les origines d'accéder à votre API. Vous pouvez également ajouter des URL d'images valides aux stuff renvoyés par l'API, en terminant la route GET. Si vous actualisez à présent l'application front-end, vous devriez voir vos articles en vente : */
app.use((request, response, next) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();

});

/* Enfin, définissez sa fonction json comme middleware global pour votre application, juste après avoir défini les headers de la réponse : */
app.use(bodyParser.json());

/* Utilisation des middleswares stocker dans un fichier stuff.js */
app.use('/api/stuff', stuffRoutes);
/* Utilisation des middlewares stocker dans un fichier user.js */
app.use('/api/auth', userRoutes);


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;





