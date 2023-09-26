const { Cancion, Album, Genero, Artista } = require('../db/models');

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
                            url: 'http://localhost:3000/canciones',
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

        let nuevaCancion = {
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            created_at: new Date(),
            updated_at: new Date(),
            genero_id: req.body.genero,
            album_id: req.body.album,
            artista_id: req.body.artista
        };

        try {
            let cancion = await Cancion.create(nuevaCancion, {
                nest: true,
                raw: true
            })
                .then(function (cancion) {
                    return res.status(201).json({
                        metadata: {
                            url: 'http://localhost:3000/canciones/' + cancion.id,
                            status: 201,
                            message: 'Cancion creada correctamente'
                        },
                        data: cancion
                    })
                })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: 'Algo salio mal - Campo invalido',
                error: error
            })
        }

    },

    getDetail: async (req, res) => {

        let cancionId = req.params.id;

        try {
            const cancion = await Cancion.findByPk(cancionId, {
                include: [{ association: 'album' }, { association: 'generoCancion' }, { association: 'artista' }],
                nest: true,
                raw: true
            })
                .then(function (cancion) {
                    if (!cancion) {
                        return res.status(404).json({
                            status: 404,
                            message: 'Cancion no encontrada'
                        })
                    } else {
                        return res.status(200).json({
                            metadata: {
                                url: 'http://localhost:3000/canciones/' + cancionId,
                                status: 200
                            },
                            data: cancion
                        })
                    }
                })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                status: 404,
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

        try {
            await Cancion.update(newValues, {
                where: {
                    id: cancionId
                }
            })
                .then(function (cancion) {
                    if (!cancionBuscada) {
                        return res.status(404).json({
                            status: 404,
                            message: 'Cancion no encontrada'
                        })
                    } else {
                        return res.status(200).json({
                            metadata: {
                                message: 'Cancion actualizada correctamente',
                                url: 'http://localhost:3000/canciones/' + cancionId,
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
            console.log(error);
            res.json({
                error: error
            })
        }
    }
}