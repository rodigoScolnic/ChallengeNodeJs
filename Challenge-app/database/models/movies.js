module.exports = (sequelize, dataTypes) => {
    const Movies = sequelize.define('movies', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            timestapms: false
        },
        title: {
            type: dataTypes.STRING(200),
        },
        createdAt: {
            field: 'created_at',
            type: dataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: dataTypes.DATE,
        },
        deletedAt: {
            field: 'deleted_at',
            type: dataTypes.DATE,
        },
        rating: {
            type: dataTypes.INTEGER(11)
        }
    },
    
    {
        tableName: 'movies',
        paranoid: true, 
    }
    );

    Movies.associate = models => {
        Movies.belongsTo(models.genres, {
            as: 'genre',
            foreignKey: 'genre_id' ,
            timestapms: false
        })

        Movies.belongsToMany(models.actors, {
            as: "actor" ,
            through: "actor_movie" ,
            foreignKey: "movie_id" ,
            otherKey: "actor_id" ,
            timestamps: false
        })
    }
    
    return Movies;
}
