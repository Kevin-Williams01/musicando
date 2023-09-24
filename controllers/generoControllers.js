const { Genero } = require('../db/models')

module.exports = {
    getList: async (req, res) => {

        try {
            const generos = await Genero.findAll({
                include: 'generoCancion',
                nest: true,
            })
                .then(function (generos) {
                    //res.send(generos)
                    res.render('listadoDeGeneros', { generos })
                })
        } catch (error) {
            res.render('listadoDeGeneros', { generos: [] })
            console.log(error);
        }

    }
}