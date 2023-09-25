const { Genero } = require('../db/models');

module.exports = {
    getList: async (req, res) => {

        try {
            const generos = await Genero.findAll({
                include: 'generoCancion',
                nest: true
            })
            .then(function (generos) {
                return res.status(200).json({
                    metadata: {
                        total: generos.length,
                        url: 'http://localhost:3000/generos',
                        status: 200
                    },
                    data: generos
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            })
        }

    }
}