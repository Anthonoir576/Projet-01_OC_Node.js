
/* *** 01 *** */
/* Importation de express */
const express = require('express');


/* *** 02 *** */
/* Notre application */
const app = express();


/* *** 03 *** */
/* ###### MIDDLEWARE ###### */
/* Réponse pour le moment pour tous type de requete effectuer sur celle-ci */
/* 1ere argument la requete, le 2eme la reponse, la 3eme next, qui permet de passé au prochain middleware .*/

/* /api/stuff serra la route de l'api, l'url de l'appli front va faire une requete a cette url la . a sont extention. il renverra un code 200 si la reponse est reussite en json de l'array stuff */
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
});


/* *** 04 *** */
/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;