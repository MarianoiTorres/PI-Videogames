const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: 4,
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platform: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notEmpty: true,
          isArray: function (value) {
            if (!Array.isArray(value)) {
              throw new Error('platform debe ser un array');
            }
          }
        }
      },
      background_image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      },
      released: {
        type: DataTypes.STRING,
        validate: {
          isDate: true,
        }
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: true,
          max: 5.0,
          min: 0.0,
        }
      }
    },
    {
      timestamps: false
    });
};
