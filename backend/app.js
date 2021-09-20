
/* Importation de express */
const express = require('express');

/* Notre application */
const app = express();

/* On exporte la constante app afin d'y accéder depuis les autres fichiers de notre projet notamment node */
module.exports = app;