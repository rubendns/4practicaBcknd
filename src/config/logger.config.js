import winston, { transports } from "winston";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'red',
        debug: 'white'
    }
};
winston.addColors(customLevelsOptions.colors);

export const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new transports.File(
            {
                filename: './errors.log',
                level: 'error',
                format: winston.format.simple()
            }
        )
    ]
})

export const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new transports.Console(
            {
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new transports.File(
            {
                filename: './errors.log',
                level: 'error',
                format: winston.format.simple()
            }
        )
    ]
})
