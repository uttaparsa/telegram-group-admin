const Composer = require("telegraf/composer");

class HelpCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;
        // init middlewares
        this.command("help", this.help.bind(this));
        this.command(`help@${process.env.BOT_ID}`, this.help.bind(this));
    }

    async help(context, next) {
        await context.replyWithMarkdown(`
Supported group member commands:

/help
/report
/score
        `);
    }
}

exports.HelpCommand = HelpCommand;
