import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import router from './routing';
import log from './libs/log';
import reportController from './src/controllers/reports.controller';


class Aplicacion{
    
    public App =  express();
    public BodyParser = bodyParser;
    

    constructor(){

        this.App.use(express.Router());
        this.App.use(this.BodyParser.urlencoded({extended: true}));
        this.App.use(express.static(path.join(__dirname, "public")));
        this.App.use('/', router);
        this.App.use('/', reportController);
        

        this.App.use((req, res, next)=>{
            res.status(404);
            log(module).debug(`Not found URL: ${ req.url}`);
            res.send({error: 'Not found'});
            return;
        });

        this.App.use((err,req,res,next)=>{
            res.status(err.status || 500);
            log(module).error(`Internal error: ${res.statusCode}, ${err.message}`);
            res.send({error: err.message});
            return;
        });

    }
}

export default new Aplicacion().App;