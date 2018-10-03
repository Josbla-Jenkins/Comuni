import * as oauth2orize from 'oauth2orize';
import * as passport from 'passport';
import * as crypto from 'crypto';
import config from './config';
import UserModel from '../src/models/users.model';
import ClientModel from '../src/models/client.model';
import AccessTokenModel from '../src/models/accessToken.model';
import RefreshTokenModel from '../src/models/refreshToken.model';

class Oauth2{
    
    public server = oauth2orize.createServer();
    private passport = passport;
    private crypto = crypto;
    private config = config;
    private UserModel = UserModel;
    private ClientModel = ClientModel;
    private AccessTokenModel = AccessTokenModel;
    private RefreshTokenModel = RefreshTokenModel;

    constructor(){
        this.server.exchange(oauth2orize.exchange.password((client, username, password, scope, done)=>{
            this.UserModel.findOne({username: username},(err, user)=>{
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false);
                if(!user.chekPassword(password))
                    return done(null, false);

                this.RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, (err)=>{
                    if(err) return done(err);
                });

                this.AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, (err)=>{
                    if(err)
                        return done(err);
                });

                let tokenValue = this.crypto.randomBytes(256).toString('hex');
                let refreshTokenValue = this.crypto.randomBytes(256).toString('hex');

                let token = new this.AccessTokenModel(
                    {
                        token: tokenValue, 
                        clientId: client.clientId, 
                        userId: user.userId
                    }
                );

                let refreshToken = new this.RefreshTokenModel(
                    {
                        token: refreshTokenValue, 
                        clientId: client.clientId, 
                        userId: user.userId
                    }
                );

                refreshToken.save((err)=>{
                    if(err)
                        return done(err);
                });

                let info = {scope: '*'}

                token.save((err, token)=>{
                    if(err)
                        return done(err);
                    
                    done(null, tokenValue, refreshTokenValue, {'expires_in': this.config.get('security: tokenLife')});
                });
            });
        }));

        this.server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
            this.RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
                if (err) { return done(err); }
                if (!token) { return done(null, false); }
                if (!token) { return done(null, false); }
        
                this.UserModel.findById(token.userId, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
        
                    this.RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                        if (err) return done(err);
                    });
                    this.AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                        if (err) return done(err);
                    });
        
                    let tokenValue = crypto.randomBytes(32).toString('hex');
                    let refreshTokenValue = crypto.randomBytes(32).toString('hex');
                    let token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
                    let refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
                    refreshToken.save(function (err) {
                        if (err) { return done(err); }
                    });

                    let info = { scope: '*' }
                    token.save(function (err, token) {
                        if (err) { return done(err); }
                        done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
                    });
                });
            });
        }));

        exports.token = [
            this.passport.authenticate(['basic', 'oauth2-client-password'], { session: false}),
            this.server.token(),
            this.server.errorHandler()
        ];
    }
}

export default new Oauth2().server;





