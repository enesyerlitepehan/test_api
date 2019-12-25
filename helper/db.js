// Using Node.js `require()`
const mongoose = require('mongoose');

module.exports = () => {
    const URI = 'mongodb+srv://enes:Enes11712272@cluster0-udnoj.mongodb.net/test?retryWrites=true&w=majority'

    mongoose.Promise = global.Promise
    mongoose.connect(URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
    mongoose.connection.on('open', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB error', err);
    });
};