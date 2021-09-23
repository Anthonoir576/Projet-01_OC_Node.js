
/* ************ MONGOOSE MODELS STRICT ************** */

/* EXPLICATION DU COURS */
/* Ici, voici ce que nous faisons :

nous créons un schéma de données qui contient les champs souhaités pour chaque Thing, indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose,

ensuite, nous exportons ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour notre application Express.

Ce modèle vous permettra non seulement d'appliquer notre structure de données, mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données comme vous le verrez dans les chapitres suivants. */

/* Récupération de mongoose */
const mongoose = require('mongoose');

/* Création d'un shéma, afin que les données saisi sont bien celle attendu */
/* la fonction shema et mise a disposition par le package mongoose ou l'on va passé un objet dont notre shema aura besoin */
/*  */
const thingSchema = mongoose.Schema({
    
    /* A noté que le _id: est généré directement par mangoDB */
    /* Le type, chaine de caractère, et le required oblige ce champs sinon pas enregistrer dans la dbb */
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true }

});

/* Donc le shéma est créer, mais ne peut être utilisé sans la fonction si dessous */
/* Pour cela nous utilisons une autre methode du package mongoose, le premiere argument de model, et le nom du modèle et le deuxieme c'est le shema qu'on a créer justement, avec ce code très simple, nous allons pouvoir interagir avec la base de donnée */
module.exports =  mongoose.model('Thing', thingSchema);