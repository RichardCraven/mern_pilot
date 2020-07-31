require('dotenv').config({path: __dirname + '/.env'})
process.env['RANDOM_ID'] = Math.random();

console.log('db name: ', process.env['DATABASE_NAME'])
console.log('token: ', process.env['API_TOKEN'])
console.log('random Id: ', process.env['RANDOM_ID'])
console.log('**********', process.env['NODE_ENV'])
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

// const routers = require('./routes/api')


const MONGODB_URI = 'mongodb+srv://testUser:Yigsuth34!@cluster0-sa9gt.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/something', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Moongoose connected.')
})


// Data Parsing
app.use(express.json());
app.use(express.urlencoded({encoded: false}));


// HTTP request logger
// app.use(cors())
app.use(morgan('tiny'));
app.use('/api', routes)
app.get('/test', function(req, res){
    res.redirect('/api')
})
app.get('/', function(req, res){
    res.redirect('/api')
})

console.log('outside')
if(process.env.NODE_ENV === 'production'){
    console.log('in here??')
    app.use(express.static('client/build'))
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));