var exports = module.exports = {};

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
            console.log("User.findOrCreateByTgId created user : "+userr)
        }else{
            console.log("User.findOrCreateByTgId found user : "+userr)
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
            console.log("User.findOrCreateOnlyByTgId created user : "+userr)
        }else{
            console.log("User.findOrCreateOnlyByTgId found user : "+userr)
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