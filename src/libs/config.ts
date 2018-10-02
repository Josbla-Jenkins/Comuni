import * as nconf from 'nconf';

class Configuracion{

    public nconf = nconf;

    constructor(){
        this.nconf.argv()
        .env()
        .file({ file: './config.json' });
    }
}

    
export default new Configuracion().nconf;