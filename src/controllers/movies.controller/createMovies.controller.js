const db = require('../../database/models/index');

const { validationResult } = require('express-validator')

module.exports = async (req,res) => {
    const { title, characters, image_url, launch_date, rate, id_genre } = req.body

    try {

        validationResult(req).throw()

        const movieCreated = await db.Movie.findOrCreate({
            where: { title },
            defaults: {
                image_url,
                launch_date,
                rate,
                id_genre
            }
        })
        
        for (let i = 0; i < characters.length; i++) {
            const { name, image_url, age, weight, story } = characters[i]
            const characterCreated = await db.Character.findOrCreate({
                where: {name},
                defaults: {
                    image_url,
                    age,
                    weight,
                    story
                }
            })
            
            if(characterCreated[1])
                await movieCreated[0].addCharacter(characterCreated[0])
        }
        
        const result = await db.Movie.findOne({
            where: { title },
            include: db.Character
        })
        
        return movieCreated[1] ?
            res.json({
                status: 201,
                data: result
            }) :
            res.json({
                error: {
                    status: 400,
                    msg: 'Pelicula ya existente'
                }
            })

    } catch (e) {

        return res.json({
            error: {
                status: 500,
                msg: e
            }
        })
        
    }

}