module.exports = function(sequelize, dataTypes){
    let alias = "User";

    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        username: {
            type: dataTypes.STRING(45),
            notNull: true
        },
        password: {
            type: dataTypes.STRING(120),
            notNull: true
        },  
    }
    let config = {
        tableName: 'users',
        timestamps: true,
        underscored: true,
        paranoid: true
    }
       
    const User = sequelize.define (alias, cols, config);
    
    return User
}