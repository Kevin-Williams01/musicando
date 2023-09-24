const { Cancion, Album, Genero, Artista } = require('../db/models')

module.exports = {
    getList: async (req, res) => {

        try {
            const canciones = await Cancion.findAll({
                include: [{association: 'album'}, {association: 'generoCancion'}, {association: 'artista'}],
                order: [
                    ['titulo', 'ASC']
                ],
                nest: true,
                raw: true
            })
                .then(function (canciones) {
                    res.render('listadoDeCanciones', { canciones })
                })
        } catch (error) {
            res.render('listadoDeCanciones', { canciones: [] })
            console.log(error);
        }

    },

    createOne: async (req, res) => {

        const nuevaCancion = {
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            genero_id: req.body.genero,
            album_id: req.body.album,
            artista_id: req.body.artista
        };

        try {
            await Cancion.create(nuevaCancion)
                .then(() => {
                    res.redirect('/canciones')
                })
        } catch (error) {
            console.log(error);
        }

    },

    getDetail: async (req, res) => {

        try {
            const cancion = await Cancion.findByPk(req.params.id, {
                include: [{association: 'album'}, {association: 'generoCancion'}, {association: 'artista'}]
            })
                .then(function (cancion) {
                    res.render('detalleDeCancion', { cancion })
                })
        } catch (error) {
            console.log(error);
        }

    },

    updateOne: async (req, res) => {

        let cancionId = req.params.id;

        const newValues = req.body;

        console.log(newValues);

        try {
            await Cancion.update(newValues, {
                where: {
                    id: cancionId
                }
            })
                .then(() => {
                    res.redirect('/canciones')
                })
        } catch (error) {
            console.log(error);
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
                .then(() => {
                    res.redirect('/canciones')
                })
        } catch (error) {
            console.log(error);
        }
    }
}