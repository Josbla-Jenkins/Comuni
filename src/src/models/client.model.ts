import * as mongoose from 'mongoose';
import dbconnect from '../../libs/mongoose'

class Client{

    private Schema = mongoose.Schema;
    private DBConnect = dbconnect;

    private Client = new this.Schema({
        name:{
            type: String,
            unique: true,
            required: true
        },
        clientId: {
            type: String,
            unique: true,
            required: true
        }, 
        clientSecret:{
            type: String,
            required: true
        }
    });

    public ClientModel = this.DBConnect.model('Client', this.Client);
}

export default new Client().ClientModel;