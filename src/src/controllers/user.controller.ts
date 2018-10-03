import * as crypto from 'crypto';
import userModel from '../models/users.model';

class UserController{

    public User = userModel;
    public Crypto = crypto;

    constructor(){
        
        this.User.methods.encryptPassword = (password)=>{
            return this.Crypto.createHmac('sha256', this.User.salt).update(password).digest('hex');
        };

        this.User.virtual('userId').get(()=>{
            return this.User.id
        });

        this.User.virtual('password').set((password)=>{
            this.User._plainPassword = password;
            this.User.salt = this.Crypto.randomBytes(256).toString('hex');
            this.User.hashedPassword = this.User.encryptPassword(password);
        }).get(()=>{
            return this.User._plainPassword;
        });

        this.User.methods.checkPassword = (password)=>{
            return this.User.encryptPassword(password) === this.User.hashedPassword;
        }
    }
}

export default new UserController().User;