require("dotenv").config();
const { Bot } = require("./logic/bot.js");

const start = async () => {
    // start bot
    let bot = new Bot(process.env.BOT_TOKEN);
    await bot.init();
    bot.start();
};

start()
    .then(result => {
        console.log(`Bot Started: ${result}`);
    })
    .catch(error => {
        console.log(`app:Bot Error: ${error}`);
        console.error('You had an error: ', error.stack);
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