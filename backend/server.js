/* IMPORTATION DU PACKAGE HTTP DE NODE */
/* Maintenant on a acces a cette objet http, qui nous permet de créer un serveur */
const http = require('http');

/* Création du SERVEUR */
/* On appel la methode createServer() du package http */
/* Prend une fonction en 2 argument, la requète et la réponse */
const server = http.createServer((request, response) => {

    response.end('Reponse serveur SECONDE is here');

});
/* Serveur prêt */


/* Maintenant le serveur doit écouter / Attendre les requètes envoyés  */
/* en première argument : si l'environnement tourne votre serveur vous envoie un port a utilisé, en deuxième arguments par defaut en 3000 */
server.listen(process.env.PORT || 3000);