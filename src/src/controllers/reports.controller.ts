import * as express from 'express';
import reportModel from '../models/reports.model';
import log from '../../libs/log';

class ReportController{

    public ReportModel = reportModel;
    public Router = express.Router();

    constructor(){
        this.Router.get('/api/reportes', (req, res)=>{

            return this.ReportModel.find((err, reports)=>{
                if(!err)
                    return res.send(reports);
                else{
                    res.statusCode = 500;
                    log(module).error(`Internal error: ${res.statusCode, err.message} `);
                    return res.send({error: 'Server error'});
                }
            });
        });

        this.Router.post('/api/reportes',(req, res)=>{

            let report = new this.ReportModel({
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

        this.Router.get('/api/reportes/:id',(req, res)=>{
           return this.ReportModel.findById(req.params.id, (err, report)=>{
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

        this.Router.delete('/api/reportes/:id', (req, res)=>{
            return this.ReportModel.findById(req.params.id, (err, report)=>{
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
}

export default new ReportController().Router;