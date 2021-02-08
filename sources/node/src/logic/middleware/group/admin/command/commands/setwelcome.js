const Composer = require("telegraf/composer");


class SetWelcome extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.command("setwelcome", this.set_welcome.bind(this));
        this.command(`setwelcome@${process.env.BOT_ID}`, this.set_welcome.bind(this));
    }

    async set_welcome(context, next) {

        let welcome_message  = this.extractTextBetweenDoubleQuotes(context.message.text)
        await this.database.set_group_welcome_message(context.message.chat.id , welcome_message);
        context.reply("پیام خوش آمد گویی گروه تغییر کرد")
    }

    extractTextBetweenDoubleQuotes(str){
        const matches = str.match(/"(.*?)"/);
        return matches
          ? matches[1]
          : str;
      }
      
}

exports.SetWelcome = SetWelcome;
