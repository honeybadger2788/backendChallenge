module.exports = function(sequelize, dataTypes){
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        email: {
            type: dataTypes.STRING(45),
            notNull: true
        },
        password: {
            type: dataTypes.STRING(120),
            notNull: true
        },
        token: {
            type: dataTypes.STRING(120),
            notNull: true
        },
        deleted_at: {
            type: dataTypes.DATE
        }
    }
    let config = {
        tableName: 'users',
        timestamps: true,
        underscored: true
    }
       
    const User = sequelize.define (alias, cols, config);
    
    return User
}