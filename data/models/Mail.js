const mongoose = require('mongoose');

class MailModel{
    constructor(){
        this.model = mongoose.model('Mail', this.mailModel());
    };

    mailModel(){
        let schema = new mongoose.Schema({
            mailID: String,
            date: Date
        });

        schema.statics.add = add;
        schema.statics.get = get;

        function add(mailID, date) {
            return new Promise((resolve,reject) => {
                mongoose.model('Mail')({mailID, date}).save(err => {
                    if(err) reject(err);
                    else resolve('ok');
                });
            });
        }

        function get(mailID){
            return new Promise((resolve,reject) => {
                mongoose.model('Mail').findOne({mailID}, (err, result) => {
                    if(err) reject(err);
                    if(!result) resolve(null);
                    else resolve(result);
                });
            });
        }

        return schema;
    }

    getModel(){
        return this.model;
    };


}



module.exports = new MailModel().getModel();
