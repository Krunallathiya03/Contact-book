const  express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const app = express();
dotenv.config();

//database connection
connectDB();

//middelware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/contacts',require("./routes/contactRoutes"))


//start server
const port = process.env.PORT || 5000;
app.listen(port, () => 
    console.log(`Server chalu thai gu....!`
    ));