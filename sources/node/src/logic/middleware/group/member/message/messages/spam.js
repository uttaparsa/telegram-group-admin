const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

class SpamMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.spam.bind(this));
    }

    async spam(context, next) {
        // check handler condition (group denied spams)
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                "DENY_SPAM"
            ))
        ) {
            return next();
        }

        // check handler condition (text or caption has spam words of group)
        let text = context.message.text
        if("caption" in context.message){
            text = context.message.caption
            console.log("photo message:"+text)
        }
        if (!(await this.database.has_spam(context.message.chat.id, text))) {
            return next();
        }

        // try warn
        // delete message
        if (
            (await warn(
                context,
                this.database,
                context.message.from.id,
                1,
                "Send spam"
            )) > 0
        ) {
            await context.deleteMessage();
        }
        return next();
    }
}

exports.SpamMessage = SpamMessage;
