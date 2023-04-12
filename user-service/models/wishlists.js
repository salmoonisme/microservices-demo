'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlists.belongsTo(models.Users, { foreignKey: 'userID' })
    }
  }
  Wishlists.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    books: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Wishlists',
    timestamps: true,
    freezeTableName: true
  });
  return Wishlists;
};