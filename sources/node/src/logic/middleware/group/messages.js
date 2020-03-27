const Composer = require("telegraf/composer");


class MessageSaver extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;


        // init middlewares
        this.use(this.message.bind(this));
    }

    async message(context, next) {
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                "SAVE_MESSAGES"
            ))
        ) {
            return next();
        }
        // check handler condition (group denied spams)
        console.log("MessageSaver:saving message to db")
        this.database.save_message_to_db(context.message.chat.id, context.message.from , context.message.message_id , context.message.text ,context.message.date)

    }
}

exports.MessageSaver = MessageSaver;
