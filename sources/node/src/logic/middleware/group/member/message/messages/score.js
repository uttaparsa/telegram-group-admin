const Composer = require("telegraf/composer");


class ScoreMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // // init middlewares
        this.use(this.score.bind(this));
    }

    async score(context, next) {
        // check handler condition (group denied spams)
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                "CALC_SCORES"
            ))
        ) {
            return next();
        }

        // get scores
        let scores = await this.database.get_score(context.message.chat.id, context.message.from.id);
        if (isNaN(scores)) {
            scores = 0;
        }

        console.log('user score is : '+scores)

        // increase warns and set
        scores += 5;
        await this.database.set_score(context.message.chat.id,  context.message.from, scores);
        
        return next();
    }
}

exports.ScoreMessage = ScoreMessage;
