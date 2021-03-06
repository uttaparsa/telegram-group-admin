const { groupChat } = require("telegraf/composer");
const Composer = require("telegraf/composer");
const {
    warn,
    unwarn
} = require("../../../utils.js");

const projectRoot = require('app-root-path');
const log = require(projectRoot + '/src/logger.js')(__filename)

class AddsMember extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.on("new_chat_members", this.adds.bind(this));
    }

    async adds(context, next) {
        // iterate joined members and call handler
        for (let member of context.message.new_chat_members) {

            await this.adds_member.call(this, context, member);
            await this.adds_bot.call(this, context, member);
            await this.adds_me.call(this, context, member);
        }
    }

    async adds_member(context, member) {
        // check handler condition (joined member)
        if (member.is_bot) {
            return;
        }

        let welcome_message = await this.database.get_group_welcome_message(context.message.chat.id);
        if(welcome_message )
            context.reply(welcome_message);
        else
            log.info(`welcome message not set for ${context.message.chat.id}!`)
        // set parent
        await this.database.set_parent(
            context.message.chat.id,
            member.id,
            context.message.from.id
        );

        // delete message
        await context.deleteMessage();
    }

    async adds_bot(context, member) {
        // check handler condition (joined bot and not me)
        if (!(member.is_bot && !process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // get warn number
        // remove bot
        // delete message
        // warm
        await context.telegram.kickChatMember(
            context.message.chat.id,
            member.id
        );
        await context.deleteMessage();
        await warn(
            context,
            this.database,
            context.message.from.id,
            1,
            "Add bot"
        );
    }

    async adds_me(context, member) {
        // check handler condition (joined bot and me)
        if (!(member.is_bot && process.env.BOT_TOKEN.includes(member.id))) {
            return;
        }

        // say sorry
        // left chat
        await context.replyWithMarkdown(`
Sorry dear [${context.message.from.first_name}](tg://user?id=${
            context.message.from.id
        })!

Only my administrators can add me to groups or channels...
        `);
        context.leaveChat();
    }
}

exports.AddsMember = AddsMember;