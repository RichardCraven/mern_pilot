require('dotenv').config({path: __dirname + '/.env'})

console.log('**********', process.env['NODE_ENV'])
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 5000;

const routes = require('./routes/api')

const MONGODB_URI = 'mongodb+srv://testUser:Yigsuth34!@cluster0-sa9gt.mongodb.net/Cluster0?retryWrites=true&w=majority'
const LOCAL_MONGODB = 'mongodb://localhost/something'
console.log('process.env.MONGODB_URI is ', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI || LOCAL_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Moongoose connected.', )
})




// Data Parsing
app.use(express.json());
app.use(express.urlencoded({encoded: false, extended: true}));


// HTTP request logger
// app.use(cors())
app.use(morgan('tiny'));
console.log('outside')
if(process.env.NODE_ENV === 'production'){
    console.log('inside')
    // I tried using
    app.use(express.static('client/build'))

    // now I'm trying:
    // app.use(express.static(__dirname + '/client/build'))
    // app.use(express.static(path.join(__dirname, "client", "build")))
}


app.use('/api', routes)
app.get('/test', function(req, res){
    res.redirect('/api')
})
app.get('/', function(req, res){
    // res.redirect('/api')
})

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(PORT, console.log(`Server is starting at ${PORT}`));