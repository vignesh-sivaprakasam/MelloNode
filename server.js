const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");

const boards    = require('./server/Board/BoardController');
const stacks    = require('./server/Stack/StackController');
const cards     = require('./server/Card/CardController');

const app = express();
var allowedOrigins = ['http://localhost:8080', 'http://localhost:3000','http://mello-server.herokuapp.com','https://mello-server.herokuapp.com','http://mello-client.herokuapp.com', 'https://mello-client.herokuapp.com', 'http://mello-react.herokuapp.com','https://mello-react.herokuapp.com'];
app.use(function(req, res, next) {

        var origin = req.headers.origin;
        if(allowedOrigins.indexOf(origin) > -1){
                res.setHeader('Access-Control-Allow-Origin', origin);
        }
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
});

//BodyParser middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;


//connect to Mongo
mongoose.connect(db)
        .then(()=> console.log("MongoDB Connected... "))
        .catch(err =>  console.log(err));


// API Routes
app.use('/api/boards', boards);

app.use('/api/boards', stacks);

app.use('/api/boards', cards);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));