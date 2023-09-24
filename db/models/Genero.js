module.exports = (sequelize, dataType) => {

    const alias = 'Genero';

    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataType.INTEGER
        },
        name: {
            type: dataType.STRING
        }
    };

    const config = {
        tableName: 'generos',
        timestamps: false
    };

    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = models => {
        Genero.hasMany(models.Cancion, {
            as: 'generoCancion',
            timestamps: false,
            foreignKey: 'genero_id'
        });
    }

    return Genero;
}