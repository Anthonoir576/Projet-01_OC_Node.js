
const bcrypt = require('bcrypt');
const User = require('../models/User');

/* bcrypt permet de haché le mot de passe . En gros qu'il ne soit pas visible, en cas de fail de la Bdd; La dépendance doit etre telecharger. Les methodes associer comme toujours sont propre a cette dépendance. */

exports.signup = (request, response, next) => {

    /* En parametre le corp de la requet du front en gros le MDP rempli par lutilisateur, et 10 correspond au nombre de fois on l'on exécute l'algo de hashage, plus il est important plus il est sécurisé, mais aussi plus le temps serra long */
    bcrypt.hash(request.body.password, 10)
    .then(hash => {
        const user = new User({

            email: request.body.email,
            password: hash

        });
        user.save()
        .then(() => response.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => response.status(400).json({ error }));
    })
    .catch(error => response.status(500).json({ error }));

};

exports.login = (request, response, next) => {


};