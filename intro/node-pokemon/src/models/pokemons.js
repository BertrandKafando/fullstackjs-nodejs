module.exports = (sequelize, DataTypes) => {
    // sequelize la connexion  la db
    // structure name of table, description de la table, config
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "le nom est deja pris"
            },
            validate: {
                notEmpty: { msg: "le champ nom de doit pas etre vide" },
                notNull: { msg: "proprieté requise" }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "uniquement des nombres entiers" },
                notNull: { msg: "proprieté requise" },
                min: { args: [0], msg: " min probleme" },
                max: { args: [99], msg: " max taille depasssé" }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "uniquement des nombres entiers" },
                notNull: { msg: "proprieté requise" }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: "ce champ doit etre une URL" },
                notNull: { msg: "proprieté requise" }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                // validateus perrsonnalisés
                isTypesValid(value) {
                    if (!value) {
                        throw new Error("un pokemon doit avoir un type")
                    }
                    if (value.split(",").length > 3) {
                        throw new Error("max 3")
                    }
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}

// change name of createdAt  or deactivate updatedAt