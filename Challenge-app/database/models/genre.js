module.exports = (sequelize, dataTypes) => {
    const Genre = sequelize.define('genres', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            timestapms: false
        },
        name: {
            type: dataTypes.STRING(200),
        },
        createdAt: {
            field: 'created_at',
            type: dataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: dataTypes.DATE,
        }
    },
    
    {
        tableName: 'genres',
        timestapms: false ,
    }

    );
        Genre.associate = function(models){
            Genre.hasMany(models.movies , {
                as: "movies" ,
                foreignKey: "genre_id"
            })
        }
    
   
    
    return Genre;
}