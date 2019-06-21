const { Signale } = require("signale");

const logger = new Signale({ scope: "extramark", interactive: true });

module.exports = { logger };
