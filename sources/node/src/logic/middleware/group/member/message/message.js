const Composer = require("telegraf/composer");


const { SpamMessage } = require("./messages/spam.js");
const { FloodMessage } = require("./messages/flood.js");
const { BotMessage } = require("./messages/bot.js");


const { BotForwardMessage } = require("./messages/bot_forward.js");
const { ChatForwardMessage } = require("./messages/chat_forward.js");

const { LinkMessage } = require("./messages/link.js");
const { FileMessage } = require("./messages/file.js");
const { ScoreMessage } = require("./messages/score.js");
const { MessageRemover } = require("./messages/message_remover");
class Message extends Composer {
    constructor(database) {
        super();

        // init middlewares

        this.use(new SpamMessage(database));
        this.use(new FloodMessage(database));
        this.use(new BotMessage(database));

        this.use(new BotForwardMessage(database));
        this.use(new ChatForwardMessage(database));

        this.use(new LinkMessage(database));
        this.use(new FileMessage(database));

        this.use(new ScoreMessage(database))
        this.use(new MessageRemover(database))
    }
}

exports.Message = Message;
