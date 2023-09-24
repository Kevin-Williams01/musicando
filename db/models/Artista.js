module.exports = (sequelize, dataType) => {

    const alias = 'Artista';

    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataType.INTEGER
        },
        nombre: {
            type: dataType.STRING

        },
        apellido: {
            type: dataType.STRING
        }
    };

    const config = {
        tableName: 'artistas',
        timestamps: false
    };

    const Artista = sequelize.define(alias, cols, config);

    Artista.associate = models => {
        Artista.hasMany(models.Cancion, {
            as: 'artista',
            foreignKey: 'artista_id'
        });
    }

    return Artista;
}