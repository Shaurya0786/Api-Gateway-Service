'use strict';
const {
  Model
} = require('sequelize');


const {enumValues} = require('../utils/common')
const {ADMIN,CUSTOMER,FLIGHT_COMPANY} = enumValues.rolesEnums
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role,{through:'User_Roles',as:'user'})
      // define association here
    }
  }
  Role.init({
    name: {
      type:DataTypes.ENUM,
      values:[ADMIN,CUSTOMER,FLIGHT_COMPANY],
      allowNull:false,
      defaultValue:CUSTOMER
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};