let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config');

mongoose.connect(config.DB_URL, { useMongoClient: true })
    .then(() =>  console.log('connection to DB succesful'))
    .catch((err) => console.error(err));

//register mongoose models
require('./models/Mail');
