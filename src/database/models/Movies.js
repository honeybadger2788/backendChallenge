module.exports = function(sequelize, dataTypes){
    let alias = 'Movie';

    let cols = {
        id_movie: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        image_url: {
            type: dataTypes.STRING(120),
            notNull: true
        },
        title: {
            type: dataTypes.STRING(45),
            notNull: true
        },
        launch_date: {
            type: dataTypes.DATE,
            notNull: true
        },
        rate: {
            type: dataTypes.INTEGER,
            notNull: true
        },
        id_genre: {
            type: dataTypes.INTEGER,
            notNull: true
        },
    }
    let config = {
        tableName: 'movies',
        timestamps: true,
        underscored: true,
        paranoid: true
    }
       
    const Movie = sequelize.define(alias, cols, config);
    
    Movie.associate = function (models) {
        
        Movie.belongsToMany(models.Character, {
        through: 'characters_movies',
        foreignKey: 'id_movie',
        otherKey: 'id_character',
        timestamps: false
        });

        Movie.belongsTo(models.Genre,{
            foreignKey: 'id_genre'
        })
    }
    
    return Movie
}