module.exports = (sequelize, dataType) => {

    const alias = 'Cancion';

    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: dataType.INTEGER
        },
        titulo: {
            type: dataType.STRING
        },
        duracion: {
            type: dataType.INTEGER
        },
        created_at: {
            type: dataType.DATE,
            defaultValue: dataType.NOW
        },
        updated_at: {
            type: dataType.DATE,
            defaultValue: dataType.NOW
        },
        genero_id: {type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'generos',
                key: 'id'
            }
        },
        album_id: {type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'albumes',
                key: 'id'
            }
        },
        artista_id: {
            type: dataType.INTEGER,
            allowNull: false,
            references: {
                model: 'artistas',
                key: 'id'
            }
        }
    };

    const config = {
        tableName: 'canciones',
        timestamps: false
    };

    const Cancion = sequelize.define(alias, cols, config);

    Cancion.associate = models => {
        Cancion.belongsTo(models.Album, {
            as: 'album',
            timestamps: false,
            foreignKey: 'album_id'
        });

        Cancion.belongsTo(models.Genero, {
            as: 'generoCancion',
            timestamps: false,
            foreignKey: 'genero_id'
        });

        Cancion.belongsTo(models.Artista, {
            as: 'artista',
            timestamps: false,
            foreignKey: 'artista_id'
        })
    }

    return Cancion;
}