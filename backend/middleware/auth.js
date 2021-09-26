const jwt = require('jsonwebtoken');


/* Dans ce middleware :

étant donné que de nombreux problèmes peuvent se produire, nous insérons tout à l'intérieur d'un bloc try...catch ;

nous extrayons le token du header Authorization de la requête entrante. N'oubliez pas qu'il contiendra également le mot-clé Bearer . Nous utilisons donc la fonction split pour récupérer tout après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch ;

nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée ;

nous extrayons l'ID utilisateur de notre token ;

si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur ;

dans le cas contraire, tout fonctionne et notre utilisateur est authentifié. Nous passons l'exécution à l'aide de la fonction next() . */
module.exports = (request, response, next) => {

    try {

        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        if (request.body.userId && request.body.userId !== userId) {

            throw 'User ID non valable !';

        } else {

            next();

        } 

    } catch(error) {

        response.status(401).json({ error: error | 'Requête non authentifiée !'})

    }

};




