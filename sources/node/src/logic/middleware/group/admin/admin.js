const Composer = require("telegraf/composer");

const { Command } = require("./command/command.js");
const { BossCommand } = require("./command/boss_command.js");
const { AddOrRemove } = require("./addorremove/addorremove.js");

class Admin extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
        this.use(Composer.acl(this.is_boss.bind(this), new BossCommand(database)));
        this.use(
            Composer.acl(this.is_boss.bind(this), new AddOrRemove(database))
        );

        this.use(Composer.acl(this.is_admin.bind(this) , new Command(database)));
        this.use(
            Composer.acl(this.is_admin.bind(this)  , new AddOrRemove(database))
        );
    }

    async is_admin(context, next) {
        if ((await this.database.is_boss(context.message.from.id))){
            return false;
        }
        if (await this.database.is_admin(context.message.from.id)) {
            return true;
        } else {
            return false;
        }
    }
    async is_boss(context, next) {
        if (await this.database.is_boss(context.message.from.id)) {
            return true;
        } else {
            return false;
        }
    }
}

exports.Admin = Admin;
