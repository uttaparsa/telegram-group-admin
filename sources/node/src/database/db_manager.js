const Sequelize = require("sequelize");

const AdminModel = require(__dirname + "/admin");
const UserModel = require(__dirname + "/user");
const GroupModel = require(__dirname + "/group");
const RuleModel = require(__dirname + "/rule");
const SpamModel = require(__dirname + "/spam");
const MessageModel = require(__dirname + "/message");
const ClearPeriodModel = require(__dirname + "/clear_period");
const ParentChildInGroupModel = require(__dirname + "/parent_child_in_group");

const projectRoot = require('app-root-path');
const log = require(projectRoot + '/src/logger.js')(__filename)


const dbConfig = getDatabaseConfig();
const options = {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false
};

if (options.dialect == "sqlite") {
    options.storage = process.env.DB_STORAGE;
}

const sequelize = new Sequelize(
    dbConfig.dbName,
    dbConfig.username,
    dbConfig.password,
    options
);

const Admin = AdminModel.createModel(sequelize, Sequelize);
const User = UserModel.createModel(sequelize, Sequelize);
const Group = GroupModel.createModel(sequelize, Sequelize);
const Rule = RuleModel.createModel(sequelize, Sequelize);
const Spam = SpamModel.createModel(sequelize, Sequelize);
const Message = MessageModel.createModel(sequelize, Sequelize);
const ClearPeriod = ClearPeriodModel.createModel(sequelize, Sequelize);
const ParentChildInGroup = ParentChildInGroupModel.createModel(
    sequelize,
    Sequelize
);

let _created = false;

class Database {
    static get created() {
        return _created;
    }

    async init() {
        if (Database.created) {
            return;
        }

        const UserGroup = sequelize.define("UserGroup", {
            warnsNumber: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
            scoreNumber: { type: Sequelize.FLOAT, defaultValue: 0 }
        });

        this.UserGroups = UserGroup;

        User.belongsToMany(Group, { through: UserGroup });
        Group.belongsToMany(User, { through: UserGroup });

        Spam.belongsToMany(Group, { through: "SpamGroup" });
        Group.belongsToMany(Spam, { through: "SpamGroup" });

        Rule.belongsToMany(Group, { through: "GroupRule" });
        Group.belongsToMany(Rule, { through: "GroupRule" });

        Message.belongsToMany(Group, { through: "MessageGroup" });
        Group.belongsToMany(Message, { through: "MessageGroup" });

        Group.hasMany(ClearPeriod);

        await sequelize.sync();
        _created = true;
    }

    async is_admin(adminTgId) {
        const admin = await Admin.findByTgId(adminTgId);
        if (admin != null) {
            return true;
        }

        return false;
    }

    async add_admin(adminTgId) {
        const [admin, _] = await Admin.findOrCreate({
            where: {
                tgId: adminTgId
            }
        });

        return admin;
    }

    async remove_admin(adminTgId) {
        await Admin.destroy({
            where: {
                tgId: adminTgId
            }
        });
    }

    async get_admins() {
        return await Admin.findAll();
    }

    async is_boss(bossTgId) {
        const boss = await Admin.findBossByTgId(bossTgId);
        if (boss != null) {
            return true;
        }

        return false;
    }

    async add_boss(adminTgId) {
        const [boss, _] = await Admin.findOrCreate({
            where: {
                tgId: adminTgId,
                is_boss:true
            }
        });

        return boss;
    }

    async remove_boss(adminTgId) {
        await Boss.destroy({
            where: {
                tgId: adminTgId
            }
        });
    }

    async get_bosses() {
        return await admin.findAll({
            where: {
                is_boss:true
            }
          });
    }

    async set_admins(adminTgIds) {
        await Admin.destroy({
            where: {},
            truncate: true
        });

        for (let i = 0; i < adminTgIds.length; i++) {
            await Admin.create({ tgId: adminTgIds[i] });
        }
    }

    async is_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId);
        const spam = await Spam.findByText(text);

        if (group == null) {
            return false;
        }
        log.info(`the hasspam function ${await group.hasSpam}`)

        return (await group.hasSpam(spam)) || (await this.is_global_spam(text));
    }


    async has_spam(groupTgId, text){
        const group_spams = (await this.get_spams(groupTgId)).map(spam  => spam.get('text') );
        log.info(`get_spams_regex len of group spams : ${group_spams.length}`)
        const regex_string = this.get_spams_regex(group_spams);
        log.info(` regex array : ${regex_string}`);
        log.info(`is this a match?: ${text.match(new RegExp(regex_string , "i"))}`)
        if (group_spams.length == 0 )
            return false;
        if(text.match(new RegExp(regex_string , "i"))){
            log.info("it was  a match")
            return true;
        }
        return false;
    }
    get_spams_regex(group_spams){
        var regex_array =  new Array();
        
        group_spams.forEach(spam => {
            String.prototype.insert = function(index, string) {
                if (index > 0)
                {
                  return this.substring(0, index) + string + this.substring(index, this.length);
                }
              
                return string + this;
              };
              const spam_length = spam.length
              var spam_with_dots = spam
              for (var i = spam_length-1; i > 0; i--) {
                spam_with_dots = spam_with_dots.insert(i,"\.*,*،*")
              }
              regex_array.push(spam_with_dots);
            //   log.info("spam with dots : "+spam_with_dots)
        });
        return regex_array.join("|")
    }



    async add_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId);
        const [spam, _] = await Spam.findOrCreate({
            where: {
                text: text
            }
        });

        await group.addSpam(spam);
    }

    async remove_spam(groupTgId, text) {
        const group = await Group.findByTgId(groupTgId);
        const spam = await Spam.findByText(text);

        await group.removeSpam(spam);
    }

    async get_spams(groupTgId) {
        const group = await Group.findByTgId(groupTgId);

        return await group.getSpams();
    }

    async set_spams(groupTgId, texts) {
        const group = await Group.findByTgId(groupTgId);

        const spams = [];
        for (let i = 0; i < texts.length; i++) {
            const [spam, _] = await Spam.findOrCreate({
                where: {
                    text: texts[i]
                }
            });

            spams.push(spam);
        }

        await group.setSpams(spams);
    }

    async add_global_spam(text) {
        await Spam.findOrCreate({
            where: {
                text: text
            }
        });

        await Spam.update(
            {
                isGlobal: true
            },
            {
                where: {
                    text: text
                }
            }
        );
    }

    async is_global_spam(text) {
        const spam = await Spam.findOne({
            where: {
                text: text,
                isGlobal: true
            }
        });

        if (spam != null) {
            return true;
        }

        return false;
    }

    async remove_global_spam(text) {
        await Spam.destroy({
            where: {
                text: text,
                isGlobal: true
            }
        });
    }

    async get_global_spams() {
        return await Spam.findAll({
            where: {
                isGlobal: true
            }
        });
    }

    async set_global_spams(texts) {
        await Spam.destroy({
            where: {
                isGlobal: true
            }
        });

        for (let i = 0; i < texts.length; i++) {
            await this.add_global_spam(texts[i]);
        }
    }

    async get_clear_times(groupTgId) {
        const group = await Group.findByTgId(groupTgId);

        return await group.getClearPeriods();
    }

    async set_clear_times(groupTgId, clearTimes) {
        const group = await Group.findByTgId(groupTgId);
        const oldClearPeriods = await group.getClearPeriods();
        await group.removeClearPeriods(oldClearPeriods);

        for (let i = 0; i < oldClearPeriods.length; i++) {
            await oldClearPeriods[i].destroy();
        }

        for (let i = 0; i < clearTimes.length; i++) {
            const newClearPeriod = await ClearPeriod.create(clearTimes[i]);
            await group.addClearPeriod(newClearPeriod);
        }
    }

    async get_warns(groupTgId, userTgId ) {
        const group = await Group.findByTgId(groupTgId);
        const [user, _] = await User.findOrCreateOnlyByTgId(userTgId);
        var ress;
        const ans = await this.UserGroups.findOne(
            { where: {userId : user.id  , telegramGroupId:group.id } }
          )



        log.info("ans is : "+ans)
        log.info("wn is : "+ans.warnsNumber)
        return ans.warnsNumber;
    }

    async set_warns(groupTgId, from, warnsNum ) {
        const group = await Group.findByTgId(groupTgId);
        const [user, _] = await User.findOrCreateByTgId(from.id , from.first_name , from.last_name);
        group.addUsers(user)
        log.info("setwarns: uid : "+user.id+" gid :"+group.id)
        this.UserGroups.update(
            { warnsNumber: warnsNum },
            { where: {userId : user.id  , telegramGroupId:group.id } }
          ).then(result =>
            log.info("update successful"+result)
          )
          .catch(err =>
            log.info("update  err : "+err)
          )


    }
    async set_score(groupTgId, from, scoreNum){
        const group = await Group.findByTgId(groupTgId);
        const [user, _] = await User.findOrCreateByTgId(from.id, from.first_name , from.last_name);
        group.addUsers(user)
        this.UserGroups.update(
            { scoreNumber: scoreNum },
            { where: {userId : user.id  , telegramGroupId:group.id} }
          ).then(result =>
            log.info("update successful"+result)
          )
          .catch(err =>
            log.info("update  err : "+err)
          )


    }

    async save_message_to_db(groupTgId , from , message_id , text , date){
        const group = await Group.findByTgId(groupTgId);
        const [message, _] = await Message.findOrCreate({
            where: {
                text: text,
                sender_id : from.id,
                message_id : message_id,
                date_send:date
            }
        });
        log.info('saving message')
        await group.addMessage(message);
    }
    async get_score(groupTgId, userTgId) {
        const group = await Group.findOne({
            where: { tgId: groupTgId },
            include: [
                {
                    model: User
                }
            ]
        });
        log.info("get_score:GOT MODEL")
        const user = group.dataValues.users.find(usr => {
            return usr.tgId == userTgId;
        });

        if (user != undefined) {
            log.info("get_score:user is defined")
            return user.UserGroup.scoreNumber;
        }
        log.info("get_score:returning nan")
        return NaN;
    }
    async get_parent(groupTgId, childTgId) {
        const result = await ParentChildInGroup.findOne({
            where: {
                groupTgId: groupTgId,
                childTgId: childTgId
            }
        });

        if (result == null) {
            return null;
        }

        return result.parentTgId;
    }

    async set_parent(groupTgId, childTgId, parentTgId) {
        try {
            await this.find_or_create_group(groupTgId);
          } catch (e) {
            log.info("group already exists!")
          }
        

        await ParentChildInGroup.destroy({
            where: {
                groupTgId: groupTgId,
                childTgId: childTgId
            }
        });

        await ParentChildInGroup.create({
            groupTgId: groupTgId,
            childTgId: childTgId,
            parentTgId: parentTgId
        });
    }

    async find_or_create_group(groupId , name) {
        const [group, _] = await Group.findOrCreate({
            where: {
                name: name,
                tgId: groupId
            }
        });

        return group;
    }

    async set_group_welcome_message(groupId , welcome_msg){
        // TODO : complete this!!
        const group = await Group.findByTgId(groupId);

        group.welcome_message = welcome_msg;
        await group.save();
        log.info(`changed welcome message of group ${group.tgId} to ${group.welcome_message}`)

    }

    async find_or_create_rule(ruleType) {
        const [rule, _] = await Rule.findOrCreate({
            where: {
                type: ruleType
            }
        });

        return rule;
    }

    async get_group_welcome_message(groupTgId){
        const group = await Group.findByTgId(groupTgId);

        return group.welcome_message
    }

    async add_rule_to_group(groupTgId, ruleType) {
        const group = await Group.findByTgId(groupTgId);
        const rule = await this.find_or_create_rule(ruleType);

        if (group == null) {
            return;
        }

        await group.addRule(rule);
    }

    async get_group_rules(groupTgId) {
        const group = await Group.findByTgId(groupTgId);

        if (group == null) {
            return;
        }

        return await group.getRules();
    }

    async remove_group_rule(groupTgId, ruleType) {
        const group = await Group.findByTgId(groupTgId);
        const rule = await Rule.findByType(ruleType);

        if (group == null) {
            return false;
        }

        await group.removeRule(rule);
    }


    async has_rule(groupTgId, ruleType) {
        const group = await Group.findByTgId(groupTgId);
        const rule = await Rule.findByType(ruleType);

        if (group == null) {
            return false;
        }

        return await group.hasRule(rule);
    }

    async group_ours(groupTgId){
        const group = await Group.findByTgId(groupTgId);

        if (group == null) {
            return false;
        }

        return true;

    }
}

function getDatabaseConfig() {
    return {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME
    };
}

exports.Database = Database;
