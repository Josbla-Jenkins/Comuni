import * as express from 'express';
import * as path from 'path';
import router from './routing';
import log from './libs/log';
import reportController from './src/reports/reports.controller';

class Aplicacion{
    
    public app;
    public ruta;

    constructor(){

        this.app = express();
        this.app.use(express.Router());
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use('/', router);
        this.app.use('/', reportController);

        this.app.use((req, res, next)=>{
            res.status(404);
            log(module).debug(`Not found URL: ${ req.url}`);
            res.send({error: 'Not found'});
            return;
        });

        this.app.use((err,req,res,next)=>{
            res.status(err.status || 500);
            log(module).error(`Internal error: ${res.statusCode}, ${err.message}`);
            res.send({error: err.message});
            return;
        });

    }
}

export default new Aplicacion().app;