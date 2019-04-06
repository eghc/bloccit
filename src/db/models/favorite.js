'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define("Favorite", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Favorite.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Favorite.addScope("lastFiveFor", (userId) => {
  // #2
      return {
        include: [{
          model: models.Post
        }],
        where: { userId: userId},
  // #3
        order: [["createdAt", "DESC"]]
      }
    });
  };


  return Favorite;
};
