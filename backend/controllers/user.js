
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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


/* Dans cette fonction :

nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données :

dans le cas contraire, nous renvoyons une erreur 401 Unauthorized ,

si l'e-mail correspond à un utilisateur existant, nous continuons ;

nous utilisons la fonction compare debcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données :

s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized et un message « Mot de passe incorrect ! » ;

s'ils correspondent, les informations d'identification de notre utilisateur sont valides. Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. Ce token est une chaîne générique pour l'instant, mais nous allons le modifier et le crypter dans le prochain chapitre. */
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
                token: jwt.sign(
                    { userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });

        })
        .catch(error => response.status(500).json({ error }));

    })
    .catch(error => response.status(500).json({ error }));

};


// EXPLICATION TOKEN
/* Les tokens d'authentification permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte. Au moment de se connecter, ils recevront leur token et le renverront automatiquement à chaque requête par la suite. Ceci permettra au back-end de vérifier que la requête est authentifiée.

Pour pouvoir créer et vérifier les tokens d'authentification, il nous faudra un nouveau package :

npm install --save jsonwebtoken
Nous l'importerons ensuite dans notre contrôleur utilisateur :

const jwt = require('jsonwebtoken');
Enfin, nous l'utiliserons dans notre fonction login : 

Dans le code ci-dessus :

nous utilisons la fonction sign dejsonwebtoken pour encoder un nouveau token ;

ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token) ;

nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production) ;

nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures ;

nous renvoyons le token au front-end avec notre réponse.

Vous pouvez désormais utiliser l'onglet « Réseau » de Chrome DevTools pour vérifier que, une fois connecté, chaque requête provenant du front-end contient bien un en-tête « Authorization » avec le mot-clé « Bearer » et une longue chaîne encodée. Il s'agit de notre token ! */

