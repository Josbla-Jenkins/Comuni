import * as mongoose from 'mongoose';
import log from './log';
import config from './config'

class DBConnect{
    public dbconnect;
    public config = config;

    constructor(){
        this.dbconnect = mongoose;
        this.dbconnect.connect(this.config.get('mongoose:uri'));
        let db = this.dbconnect.connection;

        db.on('error', (err)=>{
            log(module).error(`Connection error: ${err}`);
        });
        db.once('open', ()=>{
            log(module).info('Connected to DB!');
        });
    }
}

export default new DBConnect().dbconnect;