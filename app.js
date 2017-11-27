const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

class Application{
    constructor(){
        this.app = express();
        this.init();
    };

    init(){
        require('./data/db');
        this.app.listen(3000, ()=>{
            console.log('Server started.');
        });
        this.middleware();
        this.routes();
    };

    middleware(){
        this.app.use(bodyParser());
        this.app.use(express.static(path.join(__dirname, '/public')));
    };
    routes(){
        this.app.use('/api', require('./api/checker'))
    };
}


new Application();
