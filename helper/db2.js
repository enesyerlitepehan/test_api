module.exports = () => {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://enes:Enes11712272@cluster0-udnoj.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
    });
};
