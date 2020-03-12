const express    = require("express");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");

const boards    = require('./server/Board/BoardController');
const stacks    = require('./server/Stack/StackController');

const app = express();

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

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));