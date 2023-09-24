const { Cancion, Album, Genero, Artista } = require('../../db/models');

module.exports = {
    getList: async (req, res) => {
    try {
            const canciones = await Cancion.findAll({
                include: [{ association: 'album' }, { association: 'generoCancion' }, { association: 'artista' }],
                nest: true,
                raw: true
            })
                .then(function (canciones) {
                    return res.status(200).json({
                        metadata: {
                            total: canciones.length,
                            url: 'http://localhost:3000/api/canciones',
                            status: 200
                        },
                        data: canciones
                    })
                })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    },

    createOne: async (req, res) => {

        const nuevaCancion = {
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            created_at: new Date(),
            updated_at: new Date(),
            genero_id: req.body.genero,
            album_id: req.body.album,
            artista_id: req.body.artista
        };

        console.log(nuevaCancion);

        try {
            const datos = await Cancion.create(nuevaCancion)
                .then(function (cancion) {
                    return res.status(201).json({
                        metadata: {
                            status: 201,
                            message: 'Cancion creada correctamente'
                        },
                        id: cancion.id,
                        data: nuevaCancion
                    })
                })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: 'Algo salio mal - Campo invalido'
            })
        }

    },

    getDetail: async (req, res) => {

        let cancionId = req.params.id;

        try {
            const cancion = await Cancion.findByPk(req.params.id, {
                include: [{ association: 'album' }, { association: 'generoCancion' }, { association: 'artista' }]
            })
                .then(function (cancion) {

                    if (!cancion) {
                        return res.status(404).json({
                            message: 'Cancion no encontrada'
                        })
                    } else {
                        return res.status(200).json({
                            metadata: {
                                url: 'http://localhost:3000/api/canciones/' + cancionId,
                                status: 200
                            },
                            data: cancion
                        })
                    }
                })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: 'Cancion no encontrada'
            })
        }

    },

    updateOne: async (req, res) => {

        let cancionBuscada = await Cancion.findOne({
            where: {
                id: req.params.id
            }
        })

        let cancionId = req.params.id;

        const newValues = {
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            updated_at: new Date(),
            genero_id: req.body.genero,
            album_id: req.body.album,
            artista_id: req.body.artista
        };

        console.log(newValues);

        try {
            await Cancion.update(newValues, {
                where: {
                    id: cancionId
                }
            })
                .then(function (cancion) {
                    if (!cancionBuscada) {
                        return res.status(404).json({
                            message: 'Cancion no encontrada'
                        })
                    } else {
                        return res.status(200).json({
                            metadata: {
                                message: 'Cancion actualizada correctamente',
                                url: 'http://localhost:3000/api/canciones/' + cancionId,
                                status: 200
                            },
                            data: newValues
                        })
                    }
                })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: 'Algo salio mal - Campo invalido'
            })
        }

    },

    deleteOne: async (req, res) => {

        let cancionId = req.params.id;

        try {
            await Cancion.destroy({
                where: {
                    id: cancionId
                }
            })
                .then(function (cancion) {

                    if (!cancion) {
                        return res.status(404).json({
                            message: 'Cancion no encontrada'
                        })
                    } else {
                        return res.status(200).json({
                            metadata: {
                                status: 200,
                                message: 'Cancion eliminada correctamente'
                            },
                            data: cancion
                        })
                    }
                })
        } catch (error) {
            res.json({
                error: error
            })
            console.log(error);
        }
    }
}