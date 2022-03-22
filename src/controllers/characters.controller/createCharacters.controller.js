const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req, res) => {
    const { name, image_url, movies, age, weight, story } = req.body
    
    try {

        validationResult(req).throw()
        
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
            if(movieCreated)
            await characterCreated[0].addMovie(movieCreated[0])
        }
        
        const result = await db.Character.findOne({
            where: { name },
            include: db.Movie
        })
        
        return characterCreated[1]?
        res.status(201).json({
            status: res.statusCode,
            data: result
        }) :
        res.status(400).json({
            error: {
                status: res.statusCode,
                msg: 'Personaje ya existente'
            }
        })
        
    } catch (e) {
        
        res.status(500).json({
            error: {
                status: res.statusCode,
                msg: e
            }
        })
    }
    
}