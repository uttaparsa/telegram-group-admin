const Composer = require("telegraf/composer");

const { HelpCommand } = require("./commands/help.js");
const { ReportCommand } = require("./commands/report.js");
const { ScoreCommand } = require("./commands/score.js");

class Command extends Composer {
    constructor(database) {
        super();

        // init middlewares
        this.use(new ScoreCommand(database))
        this.use(new HelpCommand(database));
        this.use(new ReportCommand(database));

    }
}

exports.Command = Command;
