import * as mongoose from 'mongoose';
import dbconnect from '../../libs/mongoose'
class Reportes{

    public Schema = mongoose.Schema;
    public dbconnect = dbconnect;

    public Images = new this.Schema({
        kind: {
            type: String,
            enum: ['thumbnail', 'detail'],
            required: true
        },
        url: { type: String, required: true }
    });

    public Report = new this.Schema({
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        images: [this.Images],
        modified: { type: Date, default: Date.now }
    });


    public ReporteModel = this.dbconnect.model('Report', this.Report);
    
}
export default new Reportes().ReporteModel;