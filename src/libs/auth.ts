import config from './config';
import * as passport from 'passport';
import * as passportHttp from 'passport-http';
import * as passportOauth2ClientPassword from 'passport-oauth2-client-password';
import * as passportHttpBearer from 'passport-http-bearer';
import UserModel from '../src/models/users.model';
import ClientModel from '../src/models/client.model';
import AccessTokenModel from '../src/models/accessToken.model';
import RefreshTokenMode from '../src/models/refreshToken.model';

class Auth{
    private Config = config;
    private Passport = passport;
    private BasicStrategy = passportHttp.BasicStrategy; 
    private ClientPasswordStrategy = passportOauth2ClientPassword.Strategy;
    private BearerStrategy = passportHttpBearer.Strategy;
    private UserModel = UserModel;
    private ClientModel = ClientModel;
    private AccessTokenModel = AccessTokenModel;
    private RefreshTokenMode = RefreshTokenMode;

    constructor(){
        this.Passport.use(new this.BasicStrategy(
            (username, password, done)=>{
                this.ClientModel.findOne({clientId: username}, (err, client)=>{
                    if(err)
                        return done(err);
                    if(!client)
                        return done(null, false);
                    if(client.clientSecret != password)
                        return done(null, false)

                    return done(null, client);
                });
            }
        ));

        this.Passport.use(new this.BearerStrategy((accessToken, done)=>{
            this.AccessTokenModel.findOne({token: accessToken}), (err, token)=>{
                if(err)
                    return done(err);
                if(!token)
                    return done(null, false);
                
                if(Math.round((Date.now()-token.created)/1000)>this.Config.get('security: tokenLife')){
                    this.AccessTokenModel.remove({token: accessToken},(err)=>{
                        if(err)
                            return done(err);
                    });
                    return done(null, false, {message: 'Token expired'});
                }

                this.UserModel.findById(token.userId, (err, user)=>{
                    if(err)
                        return done(err);
                    if(!user)
                        return done(null, false, {message:' Unknown user'});

                    let info = {scope: '*'}
                    done(null, user, info);
                });
            }
        }));


    }
}

export default new Auth();