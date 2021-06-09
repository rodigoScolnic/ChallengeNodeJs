module.exports = (sequelize, dataTypes) => {
    const Actors = sequelize.define('actors', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            timestapms: false
        },
        first_name: {
            type: dataTypes.STRING(200),
        },
        last_name: {
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
    },
    
    {
        tableName: 'actors',
        timestapms: false ,
    }
    );
    
    return Actors;
}