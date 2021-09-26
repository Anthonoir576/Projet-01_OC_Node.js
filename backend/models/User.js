/* Création d'un schéma modele concernat l'utilisateur  */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});

/* Pour s'assurer que deux utilisateurs ne peuvent pas utiliser la même adresse e-mail, nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema . Les erreurs générées par défaut par MongoDB pouvant être difficiles à résoudre, nous installerons un package de validation pour pré-valider les informations avant de les enregistrer */

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);