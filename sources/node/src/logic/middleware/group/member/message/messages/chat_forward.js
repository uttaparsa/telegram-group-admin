const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

class ChatForwardMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.chat_forward.bind(this));
    }

    async chat_forward(context, next) {
        // check handler condition (group denied chat forwards)
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                "DENY_CHAT_FORWARD"
            ))
        ) {
            return next();
        }
        log.info("deny chat forward enabled ")
        // check handler condition (is forwarded from chat and from channel)
        if (
            !(
                ("forward_from_chat" in context.message &&
                    context.message.forward_from_chat.type === "channel") ||
                "forward_from_message_id" in context.message
            )
        ) {
            return next();
        }
        log.info("forwarded from channel")
        // try warn
        // delete message
        if (
            (await warn(
                context,
                this.database,
                context.message.from.id,
                1,
                "Channel forward"
            )) > 0
        ) {
            await context.deleteMessage();
        }
    }
}

exports.ChatForwardMessage = ChatForwardMessage;
