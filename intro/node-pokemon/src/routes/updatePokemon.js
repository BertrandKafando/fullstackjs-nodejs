const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Pokemon.findByPk(id)
                    .then(pokemon => {
                        if (pokemon == null) {
                            const message = "Le pokemons n'existe pas"
                            return res.status(404).json({ message })
                        }
                        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
                        res.json({ message, data: pokemon })
                    })
            })
            .catch(error => {
                // regle de l'application creation and update

                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.msg, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.msg })
                }
                const message = "Le pokemon n'a pas été mise à jour "
                res.status(500).json({ message, data: error })
            })

    })
}