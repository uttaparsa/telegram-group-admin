const Composer = require("telegraf/composer");

class DeleteCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("delete", this.delete.bind(this));
        this.command(`delete@${process.env.BOT_ID}`, this.delete.bind(this));
    }

    async delete(context, next) {
        // get optional delete number
        let number = parseInt(
            context.message.text.replace(/^\/delete@?[a-zA-Z]* /, "")
        );
        if (isNaN(number) || number == 0) {
            number = 1;
        }

        // delete messages
        if ("reply_to_message" in context.message) {
            let message = 0;
            let message_id = context.message.reply_to_message.message_id;
            let this_id = context.message.message_id;
            console.log('deleted message')
            let limit = 100

            while ((number >= 0 )&&( message <= limit )&&( message >= -limit)) {
                console.log("delete loop")
                try {
                    await context.telegram.deleteMessage(
                        context.message.chat.id,
                        parseInt(message_id + message)
                    );

                    // number += number >= 0 ? -1 : 1;
                    number -= 1
                    if ((message_id + message) == this_id){
                        break;
                    }
                } catch (error) {
                    console.log(`error during deleting ${error}`)
                }

                // message += number >= 0 ? 1 : -1;
                message += 1;
            }
        } else {
            await context.replyWithMarkdown(`
Please reply the message to delete!
            `);
        }
    }
}

exports.DeleteCommand = DeleteCommand;
