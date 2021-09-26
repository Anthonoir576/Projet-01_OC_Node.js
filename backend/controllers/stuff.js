const Thing = require('../models/Thing');
const fs = require('fs'); /* fileSystem de node */

exports.createThing = (request, response, next) => {

    /* on a besoin donc du titre de la description etc.. On aurait pu ecrire tous ca, mais le raccourci js '...' permet de faire la même chose En gros on copie les champs dans le body de la requet post. donc le title, description etc..  ON SUPPRIME l'id de la requete car il serra generé par mongoDB . Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end). L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body Ce modèle comporte une méthode save() qui enregistre simplement votre Thing dans la base de données. La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things. La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , nous renverrons une réponse de réussite avec un code 201 de réussite. Dans notre bloc catch() , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.*/

    /* MAJ Que fait le code ci-dessous ?

    Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data, et non sous forme de JSON. Le corps de la requête contient une chaîne thing , qui est simplement un objet Thing converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.

    Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename . Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http' ). Nous ajoutons '://' , puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL. */

    const thingObject = JSON.parse(request.body.thing);

    delete thingObject._id;
  
    const thing = new Thing({
  
      ...thingObject,
      imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`

  
    });
  
    /* Pour enregistrer cet objet dans la bdd. La methode save() enregistre l'objet dans la base et retourne un promise */
    thing.save()
    .then(() => response.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => response.status(400).json({error}));
  
};

exports.modifyThing =  (request, response, next) => {

    /* La modification de notre route PUT est sensiblement plus compliquée, car nous devons prendre en compte deux possibilités : l'utilisateur a mis à jour l'image, ou pas. Dans le premier cas, nous recevrons l'élément form-data et le fichier. Dans le second cas, nous recevrons uniquement les données JSON. Dans cette version modifiée de la fonction, on crée un objet thingObject qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant. On crée ensuite une instance Thing à partir de thingObject , puis on effectue la modification. */

    /* Opération ternaire */
    const thingObject = request.file ?
    {

        ...JSON.parse(request.body.thing),
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`

    } : { ...request.body };

    Thing.updateOne({ _id: request.params.id}, {...thingObject, _id: request.params.id})
        .then(() => response.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => response.status(400).json({error}));

};

exports.deleteThing = (req, res, next) => {

    /* Dans cette fonction :
    nous utilisons l'ID que nous recevons comme paramètre pour accéder au Thing correspondant dans la base de données ;
    nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
    nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
    dans le callback, nous implémentons la logique d'origine, en supprimant le Thing de la base de données.
    Notre API peut désormais gérer correctement toutes les opérations CRUD contenant des fichiers : lorsqu'un utilisateur crée un Thing , met à jour un Thing existant ou supprime un Thing ! */

    Thing.findOne({ _id: req.params.id })
        .then(thing => {

            const filename = thing.imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                Thing.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));

            });

        })
        .catch(error => res.status(500).json({ error }));

};

exports.getOneThing =  (request, response, next) => {

    Thing.findOne({ _id: request.params.id })
        .then(thing => response.status(200).json(thing))
        .catch(error => response.status(404).json({error}));
    
};

exports.getAllThings =  (req, res, next) => {

    Thing.find()
    .then( things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));

};