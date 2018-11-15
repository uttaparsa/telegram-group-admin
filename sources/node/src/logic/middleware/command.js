const Composer = require("telegraf/composer");
const { StartCommand } = require("./commands/start.js");
const { HelpCommand } = require("./commands/help.js");
const { RegisterCommand } = require("./commands/register.js");
const { ReportCommand } = require("./commands/report.js");
const { LearnCommand } = require("./commands/learn.js");
const { UnlearnCommand } = require("./commands/unlearn.js");
const { WarnCommand } = require("./commands/warn.js");
const { UnwarnCommand } = require("./commands/unwarn.js");

class Command extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new StartCommand(database));
        this.use(new HelpCommand(database));
        this.use(new RegisterCommand(database));
        this.use(new ReportCommand(database));
        this.use(new LearnCommand(database));
        this.use(new UnlearnCommand(database));
        this.use(new WarnCommand(database));
        this.use(new UnwarnCommand(database));

        this.on("text", this.unsupport_handler.bind(this));
    }

    async unsupport_handler(context, next) {
        // check handler condition (is command)
        if (!context.message.text.match(/^\/[a-zA-Z@]*$/)) {
            return next();
        }

        context.reply(`
Unsupported command!
click /help
        `);
    }
}

exports.Command = Command;
