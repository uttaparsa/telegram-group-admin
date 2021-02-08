const Composer = require("telegraf/composer");
const { warn, unwarn } = require("../../../utils.js");

class LinkMessage extends Composer {
    constructor(database) {
        super();

        // set database object
        this.database = database;

        // init middlewares
        this.use(this.link.bind(this));
    }

    async link(context, next) {
        // get group rule link deny regexes
        let regexes = [];
        if (
            !(await this.database.has_rule(
                context.message.chat.id,
                "DENY_LINK_regex"
            ))
        ) {
            return next();
        }
        log.info("deny link  enabled ")

        let text = context.message.text
        if("caption" in context.message){
            text = context.message.caption
            log.info("photo message:"+text)
        }
        const regex_string = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
        if(!text.match(new RegExp(regex_string , "i"))){
            log.info("it was NOT link  a match")
            return next()
        }
        
        if (
            (await warn(
                context,
                this.database,
                context.message.from.id,
                1,
                "link regex"
            )) > 0
        ) {
            await context.deleteMessage();
        }
        // not find any denied link
        // return next();
    }

    get_urls(context) {
        return (context.message.entities || [])
            .filter(entity => entity.type === "url")
            .map(entity =>
                context.message.text.substring(
                    entity.offset,
                    entity.offset + entity.length
                )
            );
    }

    get_denies() {}
}

exports.LinkMessage = LinkMessage;
