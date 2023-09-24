const express = require('express');
const router = express.Router();

const cancionControllers = require('../../controllers/api/cancionControllers');


// @GET - /api/canciones
router.get('/', cancionControllers.getList);

// @POST - /api/canciones
router.post('/', cancionControllers.createOne);

// @GET - /api/canciones/:id
router.get('/:id', cancionControllers.getDetail);

// @PUT - /api/canciones/:id
router.put('/:id', cancionControllers.updateOne);

// @DELETE - /api/canciones/:id
router.delete('/:id', cancionControllers.deleteOne);


module.exports = router;