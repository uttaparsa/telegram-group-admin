var exports = module.exports = {};

exports.createModel = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        text: {type: DataTypes.STRING},
        sender_id : DataTypes.STRING,
        message_id : {type: DataTypes.STRING},
        date_send: DataTypes.INTEGER.UNSIGNED
    })

    // Message.insert_to_db = async function(txt, sender_id , message_id) {
    //     const message = await this.create({
    //         name: txt,
    //         sender_id: sender_id,
    //         message_id: message_id
    //     })

    //     return message
    // }

    Message.findByGroup = async function(id) {
        const message = await this.findAll({
            where: {
                message_id: id
            } 
        })

        return message
    }

    return Message
}