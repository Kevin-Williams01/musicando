const express = require('express');
const router = express.Router();

const generoApiControllers = require('../../controllers/api/generoApiControllers');

// @GET - /api/generos
router.get('/', generoApiControllers.getList);

module.exports = router;