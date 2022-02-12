module.exports = function(sequelize, dataTypes){
    let alias = "Genre";

    let cols = {
        id_genre: {
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
        }  
    }
    let config = {
        tableName: 'genres',
        timestamps: false
    }
       
    const Genre = sequelize.define(alias, cols, config);
    
    
    Genre.associate = function (models) {
        Genre.hasMany(models.Movie, {
            foreignKey: 'id_genre'
        })
    }
    
    return Genre
}