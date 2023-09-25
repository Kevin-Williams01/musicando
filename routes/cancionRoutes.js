const express = require('express');
const router = express.Router();

const cancionApiControllers = require('../controllers/cancionControllers');


// @GET - /api/canciones
router.get('/', cancionApiControllers.getList);

// @POST - /api/canciones
router.post('/', cancionApiControllers.createOne);

// @GET - /api/canciones/:id
router.get('/:id', cancionApiControllers.getDetail);

// @PUT - /api/canciones/:id
router.put('/:id', cancionApiControllers.updateOne);

// @DELETE - /api/canciones/:id
router.delete('/:id', cancionApiControllers.deleteOne);


module.exports = router;