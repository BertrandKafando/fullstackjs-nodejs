const express = require('express')
let pokemons = require('./src/db/mock-pokemon')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

sequelize.initDb();



app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(cors);



//routes
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findByPkPokemon')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//gestion not found
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demmandee ! Essayez une autre route";
    res.status(404).json({ message })
})
app.listen(port, () => console.log(`pokemon application start on  port: ${port}`))