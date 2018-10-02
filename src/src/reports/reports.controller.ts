import * as express from 'express';
import reportModel from './reports.model';
import log from '../../libs/log';

class ReportController{

    public reportModel = reportModel;
    public router = express.Router();

    constructor(){
        this.router.get('/api/reportes', (req, res)=>{

            return this.reportModel.find((err, reports)=>{
                if(!err)
                    return res.send(reports);
                else{
                    res.statusCode = 500;
                    log(module).error(`Internal error: ${res.statusCode, err.message} `);
                    return res.send({error: 'Server error'});
                }
            });
        });

        this.router.post('/api/reportes',(req, res)=>{

            let report = new this.reportModel({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                images: req.body.images
            });
    
            report.save((err)=>{
                if(!err){
                    log(module).info('Report created sussesfull!!');
                    return res.send({status: 'OK', report: report});
                }else if(err.name == 'ValidationError'){
                    res.statusCode = 400;
                    res.send({error:' Validation error'});
                }else{
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                log(module).error(`Internal error: ${res.statusCode, err.message}`);
            });
        });

        this.router.get('/api/reportes/:id',(req, res)=>{
           return this.reportModel.findById(req.params.id, (err, report)=>{
                if(!report){
                    res.statusCode = 404;
                    return res.send({error: 'Not found'});
                }
                if(!err)
                    return res.send({status: 'OK', report: report});
                else{
                    res.statusCode = 500;
                    log(module).error(`Internal error: ${res.statusCode, err.message}`);
                    return res.send({error: 'Server error'});
                }
           });
        });

        this.router.delete('/api/reportes/:id', (req, res)=>{
            return this.reportModel.findById(req.params.id, (err, report)=>{
                if(!report){
                    res.statusCode = 404;
                    return res.send({error : 'Not found'});
                }else{
                    return report.remove((err)=>{
                        if(!err){
                            log(module).info('Report removed');
                            return res.send({status: 'OK'});
                        }else{
                            res.statusCode = 500;
                            log(module).error(`Intrnal errro: ${res.statusCode, err.message}`);
                            return res.send({error: 'Server error'});
                        }
                    });
                }
            });
        });
    }

    public newReport(req, res){
    }
}

export default new ReportController().router;