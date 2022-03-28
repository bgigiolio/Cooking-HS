const mongoose = require('mongoose')
const log = console.log

const URI = 'mongodb://localhost:27017' || process.env.URI

mongoose.connect(URI, {useNewUrlParser: true}).catch((error) => {
    log('MongoDB connection error')
    log(error)
})
const connection = mongoose.connection
connection.once('open', () => {
    log('Database connected successfully.');
    log(connection.client.s.url)
})
connection.on('disconnected', function(){
    log('Database disconnected!');
})
module.exports = {mongoose}