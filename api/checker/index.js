const express = require('express');
const mongoose = require('mongoose');
const Mail = mongoose.model('Mail');

class MailChecker{
    constructor(){
        this.router = express.Router();
        this.router.get('/check/:id', this.addCheckedEmail);
        this.router.post('/check', this.checkMail);
    };

    addCheckedEmail(req, res){
        if(req.params.id){
            Mail.add(req.params.id, new Date())
                .then(success => res.status(200).json({success: true}))
                .catch(err => res.status(400).json({success: false, message: "Adding to DB failed.", data: err}));
        }
    };
    checkMail(req, res){
        if(req.body.id){
            Mail.get(req.body.id)
                .then(element => {
                    if(element === null) res.status(200).json({success: true, data: {clicked: false}});
                    if(element) res.status(200).json({success: true, data: {clicked: true, date: element.date}});
                })
                .catch(err => res.status(400).json({success: false, message: "Adding to DB failed."}));
        }
    };

    getRouter(){
        return this.router;
    }
}

module.exports = new MailChecker().getRouter();