require("dotenv").config();
const { Bot } = require("./logic/bot.js");
const projectRoot = require('app-root-path');
const log = require(projectRoot + '/src/logger.js')(__filename)


const start = async () => {
    // start bot
    let bot = new Bot(process.env.BOT_TOKEN);
    await bot.init();
    bot.start();
};

start()
    .then(result => {
        log.info(`Bot Started: ${result}`);
    })
    .catch(error => {
        log.info(`app:Bot Error: ${error}`);
        log.error(`You had an error: ${error.stack}`);
    });
// const {
//     Telegraf
// } = require('telegraf')
// const Extra = require('telegraf/extra')
// let options = {
//     telegram: { // Telegram options
//         agent: null, // https.Agent instance, allows custom proxy, certificate, keep alive, etc.
//         webhookReply: true // Reply via webhook
//     },
//     channelMode: false // Handle `channel_post` updates as messages (optional)
// }
// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))

// bot.on('message', (ctx) => {
    
//     ctx.replyWithMarkdown('f:/', Extra.inReplyTo(ctx.message.message_id))
// })

// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.use(Telegraf.log());
// bot.launch()