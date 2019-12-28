// Using Node.js `require()`
const mongoose = require('mongoose');

module.exports = () => {
    const URI = 'mongodb+srv://enest:Kandy-1234@cluster0-udnoj.mongodb.net/test?retryWrites=true&w=majority';


    mongoose.connect(URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    mongoose.connection.on('open', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB error', err);
    });

    mongoose.Promise = global.Promise;
};