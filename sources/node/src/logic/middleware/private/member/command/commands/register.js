const Composer = require("telegraf/composer");

class RegisterCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("register", this.register.bind(this));
    }

    async register(context, next) {
        // register with password
        if (context.message.text.includes(process.env.BOSS_PASSWORD)) {
            await this.database.add_boss(context.message.from.id);

            await context.replyWithMarkdown(`
Boss register was successful!
            `);
        } else if (context.message.text.includes(process.env.BOT_PASSWORD)) {
            await this.database.add_admin(context.message.from.id);

            await context.replyWithMarkdown(`
Admin register was successful!
            `);
        } else {
            await context.replyWithMarkdown(`
Incorrect password!
            `);
        }
    }
}

exports.RegisterCommand = RegisterCommand;
