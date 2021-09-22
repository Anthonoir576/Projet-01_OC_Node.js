
/* *** 01 *** */
/* Importation de express */
const express = require('express');


/* *** 02 *** */
/* Notre application */
const app = express();


/* *** 03 *** */
/* Réponse pour le moment pour tous type de requete effectuer sur celle-ci */
/* 1ere argument la requete, le 2eme la reponse, la 3eme next, qui permet de passé au prochain middleware .*/
app.use((request, response, next) => {

    console.log('1ere requête');
    next();

});
/* status 201 created, et le changement de statue de la requete */
app.use((request, response, next) => {

    response.status(201);
    next();

});

app.use((request, response, next) => {

    response.json( {message : 'Votre requête a bien été reçue'});
    next();

});

app.use((request, response) => {

    console.log('Réponse envoyée avec succès');

});


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;