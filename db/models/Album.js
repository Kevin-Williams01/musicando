module.exports = (sequelize, dataType) => {

    const alias = 'Album';

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
        duracion: {
            type: dataType.INTEGER
        }
    };

    const config = {
        tableName: 'albumes',
        timestamps: false
    };

    const Album = sequelize.define(alias, cols, config);

    Album.associate = models => {
        Album.hasMany(models.Cancion, {
            as: 'album',
            foreignKey: 'album_id'
        });
    }

    return Album;
}