const path = require('path');
const winston = require('winston');



var winstonLogger = winston.createLogger({
    transports: [
        new (winston.transports.File)({
            level: 'info',
            filename: 'WinLogs.log',
            prettyPrint: true,
            colorize: true,
            timestamp: true
        }),
        new (winston.transports.Console)({
            level: 'info',
            prettyPrint: true,
            colorize: true,
            timestamp: true
        })
    ]
})


module.exports = function (fileName) {
    var myLogger = {
        error: function (text) {
            winstonLogger.error(path.basename(fileName) + ': ' + text)
        },
        info: function (text) {
            winstonLogger.info(path.basename(fileName) + ': ' + text)


        }
    }

    return myLogger
}
