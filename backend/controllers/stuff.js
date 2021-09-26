const Thing = require('../models/Thing');

exports.createThing = (request, response, next) => {

    /* on a besoin donc du titre de la description etc.. On aurait pu ecrire tous ca, mais le raccourci js '...' permet de faire la même chose En gros on copie les champs dans le body de la requet post. donc le title, description etc..  ON SUPPRIME l'id de la requete car il serra generé par mongoDB . Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript contenant toutes les informations requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end). L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body Ce modèle comporte une méthode save() qui enregistre simplement votre Thing dans la base de données. La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things. La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , nous renverrons une réponse de réussite avec un code 201 de réussite. Dans notre bloc catch() , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.*/

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

    Thing.updateOne({ _id: request.params.id}, {...request.body, _id: request.params.id})
        .then(() => response.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => response.status(400).json({error}));

};

exports.deleteThing = (request, response, next) => {

    Thing.deleteOne({ _id: request.params.id})
        .then(() => response.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => response.status(400).json({error}));
    
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