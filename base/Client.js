const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");

/** 
 * 
 * @extends Discord.Client
*/
class disfus extends Client {
    /**
     * @param {Object} options 
     * @param {Object} options.clientOptions 
     * @param {Object} options.config 
     * @param {Object} options.perms 
     */
    constructor(options) {
        
        super(options.clientOptions || {});

        /**
         * 
         * @type {Discord.Collection}
         */
        this.commands = new Collection();
        /**
         * 
        /**
        * @type {Discord.Collection}
        */
       this.aliases = new Collection();
        
        /**
         * 
         * @type {Object}
         */
        this.config = options.config ? require(`../${options.config}`) : {};
        /**
         *
         * @type {Object}
         */
        this.perms = options.perms ? require(`../${options.perms}`) : {};

        //
        console.log(`Client initialised. You are using node ${process.version}.`);
    }

    /**
     *
     * @param {String} token
     */
    login(token) {
      
        super.login(token);

     
        return this;
    }

    /**
     * 
     * @param {String} path 
     */
    loadCommands(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(cmd => {
                const command = new (require(`../${path}/${cmd}`))(this);

                this.commands.set(command.help.name, command);

                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });

        return this;
    }

    /**
     * 
     * @param {String} path 
     */
    loadEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(evt => {
                const event = new (require(`../${path}/${evt}`))(this);

                super.on(evt.split(".")[0], (...args) => event.run(...args));
            });
        });

        return this;
    }
}

module.exports = disfus;