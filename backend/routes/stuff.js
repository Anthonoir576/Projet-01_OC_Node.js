
/* Importation de express */
const express = require('express');
const router = express.Router();

/* IMPORTATION VERIFICATION TOKEN */
const auth = require('../middleware/auth');

/* Importation de multer */
const multer = require('../middleware/multer-config');

/* Pour pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier */
const stuffCtrl = require('../controllers/stuff');

/* ###### MIDDLEWARE ###### */
/* Réponse pour le moment pour tous type de requete effectuer sur celle-ci */
/* 1ere argument la requete, le 2eme la reponse, la 3eme next, qui permet de passé au prochain middleware. Rajout d'un middleware c'est le premier executer par le serveur, middleware general on ne met pas de route specifique il serra donc appliquer a toute les requetes a notre serveur 
le premier header permet de donner l'acces a lapi a tous le monde, on autorise laccest a certain header, ainsi que les methodes utilisé. cela aura pour effet de d'autorisé lacces a l'application d'acceder a lapi sans probleme  ne pas oublier dappeler next, pour effectuer le prochain middleware */

/* L'ordre des middlewares est important ! Si nous devons placer multer avant le middleware d'authentification, même les images des requêtes non authentifiées seront enregistrées dans le serveur. Veillez à placer multer après auth ! */


/* ### POST ### */
/* Maintenant, body-parser a analysé le corps de la demande. Au lieu de l'écrire dans un middleware .use() qui traiterait toutes les requêtes, nous allons l'écrire dans un.post() qui ne traitera que les requêtes de type POST : */
router.post('/', auth, multer, stuffCtrl.createThing);
  
  
/* ### PUT ### */
/* Modifie un element */
/* Ajoutons une autre route à notre application, juste en dessous de notre route GET individuelle. Cette fois, elle répondra aux requêtes PUT : Ci-dessus, nous exploitons la méthode updateOne() dans notre modèle Thing . Cela nous permet de mettre à jour le Thing qui correspond à l'objet que nous passons comme premier argument. Nous utilisons aussi le paramètre id passé dans la demande et le remplaçons par le Thing passé comme second argument. Vous pouvez maintenant tester votre nouvelle route : cliquez sur un Thing de l'application, puis sur son bouton Modifier, changez ses paramètres puis sauvegardez. Vous envoyez alors un Thing modifié au back-end. En revenant sur la page des articles, vous devriez retrouver votre article modifié. */
router.put('/:id', auth, multer, stuffCtrl.modifyThing);


/* ### DELETE ### */
/* SUPPRIME UN */
/* La méthode deleteOne() de notre modèle fonctionne comme findOne() et updateOne() dans le sens où nous lui passons un objet correspondant au document à supprimer. Nous envoyons ensuite une réponse de réussite ou d'échec au front-end. */
router.delete('/:id', auth, stuffCtrl.deleteThing);


/* ### GET ### */
/* RECUPERE UN */
/* Dans cette route : nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ; nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ; ce Thing est ensuite retourné dans une Promise et envoyé au front-end ; si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée. le :id dit a express que cette partie de la route et dynamique */
router.get('/:id', auth, stuffCtrl.getOneThing);


/* ### GET ### */
/* RECUPERE TOUS */
/* -  /api/stuff serra la route de l'api, l'url de l'appli front va faire une requete a cette url la . a sont extention. Désormais, nous pouvons implémenter notre route GET afin qu'elle renvoie tous les Things dans la base de données ans l'exemple ci-dessus, nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données. À présent, si vous ajoutez un Thing , il doit s'afficher immédiatement sur votre page d'articles en vente. En revanche, si vous cliquez sur l'un des Things , l'affichage d'un seul élément ne fonctionne pas. En effet, il tente d'effectuer un appel GET différent pour trouver un Thing individuel. Implémentons cette route maintenant.*/
router.get('/', auth, stuffCtrl.getAllThings);


/* On Réexporte le routeur, de ce fichier là */
module.exports = router; 