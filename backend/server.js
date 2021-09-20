
/* IMPORTATION DU PACKAGE HTTP DE NODE */
/* Maintenant on a acces a cette objet http, qui nous permet de créer un serveur */
/* *** 01 *** */
const http = require('http');


/* *** 02 *** */
/* On récupère express, configurer dans le fichier app.js */
const app = require('./app');

/* Création du SERVEUR */
/* On appel la methode createServer() du package http */
/* Prend une fonction en 2 argument, la requête et la réponse */
// const server = http.createServer((request, response) => {

//     response.end('Reponse serveur');

// });
/* Serveur prêt */


/* *** 03 *** */
/* On dit a l'application express sur quel port elle va tourner. Exactement comme plus bas. */
app.set('port', process.env.PORT || 3000);

/* l'application créer par express, et une fonction. Qu'on a récupéré via l'importe plus haut */
const server = http.createServer(app);


/* *** 04 *** */
/* Maintenant le serveur doit écouter / Attendre les requêtes envoyés  */
/* en première argument : si l'environnement retourne un serveur vous envoie un port a utilisé, en deuxième arguments par defaut en 3000 */
server.listen(process.env.PORT || 3000);