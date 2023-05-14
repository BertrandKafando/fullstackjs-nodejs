const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {

        if (req.query.name) {
            const name = req.query.name;
            const limit = req.query.limit || 5

            if (name.length <= 2) {
                const message = "le min n'est pas atteint"
                res.status(400).json({ message })
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `${name}`
                    }
                },
                order: ['name'],
                limit: limit
            })
                .then(({ count, rows }) => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: rows })
                })
        } else {
            Pokemon.findAll({ order: ['name'] })
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: pokemons })
                })
                .catch(error => {
                    const message = "La liste des pokemons n'a pas été recuperé! Réessayez dans quelques minutes "
                    res.status(500).json({ message, data: error })
                })
        }


    })


}