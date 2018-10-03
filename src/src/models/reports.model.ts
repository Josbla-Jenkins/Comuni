import * as mongoose from 'mongoose';
import dbconnect from '../../libs/mongoose'

class Reportes{

    private Schema = mongoose.Schema;
    private DBConnect = dbconnect;

    private Images = new this.Schema({
        kind: {
            type: String,
            enum: ['thumbnail', 'detail'],
            required: true
        },
        url: { type: String, required: true }
    });

    private Report = new this.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        images: [this.Images],
        modified: { type: Date, default: Date.now }
    });


    public ReporteModel = this.DBConnect.model('Report', this.Report);
    
}
export default new Reportes().ReporteModel;