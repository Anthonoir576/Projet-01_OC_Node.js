
/* *** 01 *** */
/* Importation de express */
const express = require('express');


/* *** 02 *** */
/* Notre application */
const app = express();


/* *** 03 *** */
app.use((request, response) => {

    response.json( {message : 'Votre requête a bien été reçue'});

});


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;