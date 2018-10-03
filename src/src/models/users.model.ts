import * as mongoose from 'mongoose';
import dbconnect from '../../libs/mongoose'

class User{

    private Schema = mongoose.Schema;
    private DBConnect = dbconnect;

    private User = new this.Schema({
        username:{
            type: String,
            unique: true,
            required: true
        },
        hashedPassword:{
            type: String,
            required: true
        },
        salt:{
            type: String,
            required: true
        },
        created:{
            type: Date,
            default: Date.now
        }
    });

    public UserModel = this.DBConnect.model('User', this.User);
}

export default new User().UserModel;