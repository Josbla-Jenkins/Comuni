import * as winston from 'winston';

class Logger{

    public getLogger(module){

        let path = module.filename.split('/').slice(-2).join('/');

        let options = {
            console:{
                level: 'debug',
                format: winston.format.json(),
                colorize: true,
                label: path
            }
        };

        return winston.createLogger({
            transports:[
                new winston.transports.Console(options.console)
            ]
        });
    }
}

export default new Logger().getLogger;