import * as express from 'express';
import reportModel from './src/reports/reports.model';
import log from './libs/log';

class Routing{

    public router = express.Router();
    public reportModel = reportModel;

    constructor(){

        this.router.get('/api', (req, res)=>{ 
            res.send('API is runnig');
        });
    }
}

export default new Routing().router;