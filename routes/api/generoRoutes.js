const express = require('express');
const router = express.Router();

const generoControllers = require('../../controllers/api/generoControllers');

// @GET - /api/generos
router.get('/', generoControllers.getList);

module.exports = router;