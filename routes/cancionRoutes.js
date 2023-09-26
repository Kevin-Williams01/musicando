const express = require('express');
const router = express.Router();

const cancionControllers = require('../controllers/cancionControllers');


// @GET - /canciones
router.get('/', cancionControllers.getList);

// @POST - /canciones
router.post('/', cancionControllers.createOne);

// @GET - /canciones/:id
router.get('/:id', cancionControllers.getDetail);

// @PUT - /canciones/:id
router.put('/:id', cancionControllers.updateOne);

// @DELETE - /canciones/:id
router.delete('/:id', cancionControllers.deleteOne);


module.exports = router;