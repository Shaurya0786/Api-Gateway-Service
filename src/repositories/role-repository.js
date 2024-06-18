const CrudRepository = require("./crud-repository");
const {Role} = require('../models');
const { AppError } = require("../utils");

class RoleRepository extends CrudRepository{
    constructor(){
        super(Role)
    }

    async getRolebyname(name){
        const role = await Role.findOne({where:{name:name}})
        return role
    }
}


module.exports = RoleRepository