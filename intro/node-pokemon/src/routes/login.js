const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if (!user) {
                    const message = " l'utilisateur n'existe pas ";
                    res.status(400).json({ message })
                }

                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {
                        if (!isPasswordValid) {
                            const message = " le mot de passe est incorrect";
                            res.status(400).json({ message })
                        }

                        const token = jwt.sign(
                            { userId: user.id },
                            privateKey,
                            { expiresIn: '24h' }
                        )

                        const message = `L'utilisateur a été connecté avec succès`;
                        return res.json({ message, data: user, token })
                    })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu se connecter`;
                res.status(500).json({ message, data: error })
            })
    })
}