module.exports = function(sequelize, dataTypes, models){
    let alias = "Character_Movie";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        }
    }
    let config = {
        tableName: 'characters_movies'
    }
    
    const characterMovie = sequelize.define (alias, cols, config);
    
    return characterMovie
}