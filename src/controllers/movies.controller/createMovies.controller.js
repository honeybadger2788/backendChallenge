const db = require('../../database/models/index');

module.exports = async (req,res) => {
    const { title, characters, image_url, launch_date, rate, id_genre } = req.body
    
    const movie = await db.Movie.create({
        title,
        image_url,
        launch_date,
        rate,
        id_genre
    })
    
    for (let i = 0; i < characters.length; i++) {
        const { name, image_url, age, weight, story } = characters[i]
        const character = await db.Character.create({
            name,
            image_url,
            age,
            weight,
            story
        })
        
        await movie.addCharacter(character)
    }
    
    const result = await db.Movie.findOne({
        where: { title },
        include: db.Character
    })
    
    res.json({ status: 201, body: result })
    
}