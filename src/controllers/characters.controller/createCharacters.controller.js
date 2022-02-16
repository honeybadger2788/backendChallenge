const db = require('../../database/models/index');

module.exports = async (req, res) => {
    const { name, image_url, movies, age, weight, story } = req.body
    
    try {
        
        const characterCreated = await db.Character.findOrCreate({
            where: {name},
            defaults: {
                image_url,
                age,
                weight,
                story
            }
        })
        
        for (let i = 0; i < movies.length; i++) {
            const { title, image_url, launch_date, rate, id_genre } = movies[i]
            const movieCreated = await db.Movie.findOrCreate({
                where: { title },
                defaults: {
                    image_url,
                    launch_date,
                    rate,
                    id_genre
                }
            })
            if(movieCreated[1])
            await characterCreated[0].addMovie(movieCreated[0])
        }
        
        const result = await db.Character.findOne({
            where: { name },
            include: db.Movie
        })
        
        return characterCreated && result ?
        res.json({
            status: 201,
            data: result
        }) :
        res.json({
            error: {
                status: 400,
                msg: 'No se pudo crear el personaje'
            }
        })
        
    } catch (e) {
        
        res.json({
            error: {
                status: 500,
                msg: e
            }
        })
    }
    
}