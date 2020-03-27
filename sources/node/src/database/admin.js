var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin', {
        tgId: {type: DataTypes.STRING, unique: true},
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        is_boss : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    })

    Admin.findByTgId = async function (adminTgId) {
        const admin = await this.findOne({
            where: {
                tgId: adminTgId
            } 
        })

        return admin
    }

    Admin.findBossByTgId = async function (bossTgId) {
        const boss = await this.findOne({
            where: {
                tgId: bossTgId,
                is_boss : true
            } 
        })

        return boss
    }

    return Admin
}