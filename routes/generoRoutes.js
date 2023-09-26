const express = require('express');
const router = express.Router();

const generoControllers = require('../controllers/generoControllers');

// @GET - /generos
router.get('/', generoControllers.getList);

module.exports = router;