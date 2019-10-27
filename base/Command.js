/** 
 * 
*/
class Command {
    /**
     * @param {CustomClient} client 
     * @param {Object} options 
     */
    constructor(client, options) {
        /**
         * 
         * @type {CustomClient}
         */
        this.client = client;
        /**
         * 
         * @type {Object}
         */
        this.help = {
            name: options.name || null,
            description: options.description || "No hay informacion.",
            usage: options.usage || "No se especifico un ejemplo.",
            category: options.category || "No se definio una categoria",
         
        };
        /**
         * 
         * @type {Object}
         */
        this.conf = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            cooldown: options.cooldown || 1000,
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false
        };
        /**
         * 
         * @type {Set}
         */
        this.cooldown = new Set();
    }

    /**s
     * 
     * @param {String} user 
     */
    startCooldown(user) {
    
        this.cooldown.add(user);

    

        setTimeout(() => {
            this.cooldown.delete(user);
        }, this.conf.cooldown);
    }

    setMessage(message) {
        this.message = message;
    }

    respond(message) {

        this.message.channel.send(message);
    }
}


module.exports = Command;