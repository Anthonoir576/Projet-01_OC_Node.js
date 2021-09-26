
const bcrypt = require('bcrypt');
const User = require('../models/User');

/* bcrypt permet de haché le mot de passe . En gros qu'il ne soit pas visible, en cas de fail de la Bdd; La dépendance doit etre telecharger. Les methodes associer comme toujours sont propre a cette dépendance. */

/* Dans cette fonction :

nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois. Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé. Pour plus d'informations, consultez la documentation de bcrypt ;

il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;

dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données, en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec ; */
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

    User.findOne({ email: request.body.email })
    .then(user => {

        if(!user) {
            return response.status(401).json({ error: 'Utilisateur non trouvé !' });
        }

        bcrypt.compare(request.body.password, user.password)
        .then(valid => {

            if(!valid) {
                return response.status(401).json({ error: 'Mot de passe incorrect !' });  
            }

            response.status(200).json({
                userId: user._id,
                token: 'TOKEN'
            });
            
        })
        .catch(error => response.status(500).json({ error }));

    })
    .catch(error => response.status(500).json({ error }));

};