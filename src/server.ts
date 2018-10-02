import app from './app';
import log from './libs/log';
import config from './libs/config';

//let port : any = process.env.PORT || config.get('port');

app.listen(config.get('port'), (err : any)=>{
    if(err){
        log(module).info(err);
    }else{
        log(module).info(`El servicio esta activo y escuchando en el puerto: ${config.get('port')}`);
    }
});