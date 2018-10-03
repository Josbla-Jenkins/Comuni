import * as mongoose from 'mongoose';
import dbconnect from '../../libs/mongoose'

class AccessToken{

    private Schema = mongoose.Schema;
    private DBConnect = dbconnect;

    private AccessToken = new this.Schema({
        userId:{
            type: String,
            required: true
        },
        clientId:{
            type: String,
            required: true
        },
        token:{
            type: String,
            unique: true,
            required: true
        },
        created:{
            type: Date,
            default: Date.now
        }
    });

    public AccessTokenModel = this.DBConnect.model('AccessToken', this.AccessToken);

}

export default new AccessToken().AccessTokenModel;