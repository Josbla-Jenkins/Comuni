import * as express from 'express';
import reportModel from './src/models/reports.model';
import log from './libs/log';
import oauth2 from './libs/oauth2';
import * as passport from 'passport';
require('./libs/auth');

class Routing{

    public Router = express.Router();
    public ReportModel = reportModel;
    public passport  = passport;
    public oauth2 = oauth2;

    constructor(){

        this.Router.use(this.passport.initialize());

        this.Router.get('/api', (req, res)=>{ 
            res.send('API is runnig');
        });

        this.Router.post('/oauth/token', this.oauth2.token);

        this.Router.get('/api/userInfo', passport.authenticate('bearer', { session: false }),
        (req, res)=> {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate a scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ user_id: req.body.user.userId, name: req.body.user.username, scope: req.body.authInfo.scope })
        });
    }
}

export default new Routing().Router;