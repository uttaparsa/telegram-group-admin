var exports = module.exports = {};
const projectRoot = require('app-root-path');
const log = require(projectRoot + '/src/logger.js')(__filename)

exports.createModel = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        tgId: {type: DataTypes.STRING, unique: true},
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
    })

    User.findOrCreateByTgId = async function (userTgId , f_name , l_name) {
        const user = await this.findOrCreate({
            where: {
                tgId: userTgId
            },
            defaults: {name : f_name , lastname : l_name}
        });
        [userr, created ] = user;
        if (created){
            log.info("User.findOrCreateByTgId created user : "+userr)
        }else{
            log.info("User.findOrCreateByTgId found user : "+userr)
        }
        return user
    }
    User.findOrCreateOnlyByTgId = async function (userTgId) {
        const user = await this.findOrCreate({
            where: {
                tgId: userTgId
            },
        });
        [userr, created ] = user;
        if (created){
            log.info("User.findOrCreateOnlyByTgId created user : "+userr)
        }else{
            log.info("User.findOrCreateOnlyByTgId found user : "+userr)
        }
        return user
    }


    User.updateWarnsNumberByTgId = async function(newWarnsNum, userTgId) {
        await User.update({
            warnsNumber: newWarnsNum,
          }, {
                where: {
                    tgId: userTgId
            }
        });
    }


    User.updateScoreNumberByTgId = async function(newScoreNumber, userTgId) {
        await User.update({
            scoreNumber: newScoreNumber,
          }, {
                where: {
                    tgId: userTgId
            }
        });
    }

    return User
}