const Composer = require("telegraf/composer");

class ScoreCommand extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;
        // init middlewares
        this.command("score", this.score.bind(this));
        this.command(`score@${process.env.BOT_ID}`, this.score.bind(this));
    }

    async score(context, next) {
        let user_score = await this.database.get_score(context.message.chat.id, context.message.from.id)
        await context.replyWithMarkdown(`Your score is : ${user_score}`);
    }
}

exports.ScoreCommand = ScoreCommand;