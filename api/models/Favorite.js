const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./User")

class Favorite extends Sequelize.Model {}

Favorite.init(
  {
    isMovie: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    sequelize: db,
    modelName: "favorite",
  }
);

Favorite.belongsTo(User)

module.exports = Favorite;
