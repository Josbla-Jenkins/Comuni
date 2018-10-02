import * as winston from 'winston';

class Logger{

    public getLogger(module){

        let path = module.filename.split('/').slice(-2).join('/');
        return winston.createLogger({
            level: 'debug',
            format: winston.format.json(),
            transports:[
                new winston.transports.Console({
                    format: winston.format.simple()
                })
            ]
        });
    }
}

export default new Logger().getLogger;