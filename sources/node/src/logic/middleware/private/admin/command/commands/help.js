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
        if(await this.database.is_boss(context.message.from.id)){
            await context.replyWithMarkdown(`
Supported private admin commands:

/start
/help
/ping
/admins
/globallearns
/globallearn [{words}]
/globalunlearn [{words}]
                    `);
        }else{
            await context.replyWithMarkdown(`
Supported private admin commands:

/start
/help
/ping
/admins
/globallearns
                    `);
        }
    }
}


exports.HelpCommand = HelpCommand;
