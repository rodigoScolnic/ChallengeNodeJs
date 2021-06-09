module.exports = (sequelize, dataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER(11),
            timestapms: false
        },
        name: {
            type: dataTypes.STRING(200),
        },
        email: {
            type: dataTypes.STRING(200),
        },
        password: {
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
        rol: {
            type: dataTypes.INTEGER(11),
        }
    },
    
    {
        tableName: 'users',
        timestapms: false ,
    }
    );

    
    return Users;
}