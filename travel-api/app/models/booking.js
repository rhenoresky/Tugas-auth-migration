'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      Booking.belongsTo(models.Vehicle, {
        foreignKey: 'VehId'
      })
      Booking.belongsTo(models.Destination, {
        foreignKey: 'DesId'
      })
    }
  }
  Booking.init({
    kode: DataTypes.STRING,
    schedule: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};