import * as mongoose from 'mongoose';
import log from './log';
import config from './config'

class DBConnect{
    public DBConnect = mongoose;
    private Config = config;
    private Log = log;

    constructor(){

        this.ConnectDB();

    }

    private ConnectDB(){

        this.DBConnect.connect(this.Config.get('mongoose:uri'),{ useNewUrlParser: true });
        let db = this.DBConnect.connection;

        db.on('error', (err)=>{
            this.Log(module).error(`Connection error: ${err}`);
        });
        db.once('open', ()=>{
            this.Log(module).info('Connected to DB!');
        });    
    }
}

export default new DBConnect().DBConnect;