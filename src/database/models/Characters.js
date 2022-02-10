module.exports = function(sequelize, dataTypes){
    let alias = "Character";

    let cols = {
        id_character: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        name: {
            type: dataTypes.STRING(45),
            notNull: true
        },
        image_url: {
            type: dataTypes.STRING(120),
            notNull: true
        },
        age: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        weight: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        story: {
            type: dataTypes.TEXT,
            notNull: true
        },
    }
    let config = {
        tableName: 'characters',
        timestamps: true,
        underscored: true,
        paranoid: true
    }
       
    const Character = sequelize.define (alias, cols, config);
    
    return Character
}