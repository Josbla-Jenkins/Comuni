import * as mongoose from 'mongoose';
import dbconnect from '../../libs/mongoose'

class RefreshToken{

    private Schema = mongoose.Schema;
    private DBConnet = dbconnect;
    
    private RefreshToken = new this.Schema({
        userId:{
            type: String,
            required: true
        },
        clientId: {
            type: String,
            required: true
        },
        token:{
            type: String,
            unique: true,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    public RefreshTokenModel = this.DBConnet.model('RefreshToken', this.RefreshToken);

}

export default new RefreshToken().RefreshTokenModel;