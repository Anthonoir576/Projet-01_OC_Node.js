
/* *** 01 *** */
/* Importation de express */
const express = require('express');


/* *** 02 *** */
/* Notre application */
const app = express();


/* *** 03 *** */
/* Réponse pour le moment pour tous type de requete effectuer sur celle-ci */
app.use((request, response) => {

    response.json( {message : 'Votre requête a bien été reçue'});

});


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;