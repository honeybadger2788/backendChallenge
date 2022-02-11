module.exports = function(sequelize, dataTypes, models){
    let alias = "Character-Movie";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        id_character: {
            type: dataTypes.INTEGER,
            references: {
                model: 'characters',
                key: 'id_character'
            }
        },
        id_movie: {
            type: dataTypes.INTEGER,
            references: {
                model: 'movies',
                key: 'id_movie'
            }
        }         
    }
    let config = {
        tableName: 'characters_movies'
    }
    
    const characterMovie = sequelize.define (alias, cols, config);
    
    return characterMovie
}