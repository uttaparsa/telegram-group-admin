const Composer = require("telegraf/composer");


class MessageRemover extends Composer {
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
                "DISABLE_CHAT"
            ))
        ) {
            return next();
        }
        // check handler condition (group denied spams)
        context.deleteMessage()

    }
}

exports.MessageRemover = MessageRemover;
