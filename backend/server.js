
/* *** 01 *** */
/* IMPORTATION DU PACKAGE HTTP DE NODE */
/* Maintenant on a acces a cette objet http, qui nous permet de créer un serveur */
const http = require('http');


/* *** 02 *** */
/* On récupère express, configurer dans le fichier app.js */
const app = require('./app');

/* Création du SERVEUR */
/* On appel la methode createServer() du package http . Prend une fonction en 2 argument, la requête et la réponse */
/* 

    const server = http.createServer((request, response) => {

     response.end('Reponse serveur');

    });

*/
/* Serveur prêt */


/* *** 03 *** */
/* la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne */
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};


/* *** 04 *** */
/* On dit a l'application express sur quel port elle va tourner. Exactement comme plus bas. */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/* *** 05 *** */
/* la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
};


/* *** 06 *** */
/* l'application créer par express, et une fonction. Qu'on a récupéré via l'importe plus haut */
const server = http.createServer(app);


/* *** 07 *** */
/* un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


/* *** 08 *** */
/* Maintenant le serveur doit écouter / Attendre les requêtes envoyés  */
/* en première argument : si l'environnement retourne un serveur vous envoie un port a utilisé, en deuxième arguments par defaut en 3000 */
server.listen(port);