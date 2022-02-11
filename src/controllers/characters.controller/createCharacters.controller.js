const db = require('../../database/models/index');

module.exports = async (req, res) => {
    const { name, image_url, movies, age, weight, story } = req.body
    
    const character = await db.Character.create({
        name,
        image_url,
        age,
        weight,
        story,
    })
    
    for (let i = 0; i < movies.length; i++) {
        const { title, image_url, launch_date, rate, id_genre } = movies[i]
        const movie = await db.Movie.create({
            title,
            image_url,
            launch_date,
            rate,
            id_genre
        })
        await character.addMovie(movie)
    }
    
    const result = await db.Character.findOne({
        where: { name },
        include: db.Movie
    })
    
    res.json({ status: 201, body: result })
}