const Composer = require("telegraf/composer");

const { Command } = require("./command/command.js");

class Admin extends Composer {
    constructor(database) {
        super();

        this.database = database;

        // init middlewares
        this.use(this.is_admin.bind(this), new Command(database));
    }

    async is_admin(context, next) {
        if (await this.database.is_admin(context.message.from.id)) {
            console.log("ADMIN");
            return next();
        } else {
            console.log("NOT ADMIN");
            return next();
        }
    }
}

exports.Admin = Admin;
