const express = require("express");
const expresshandle = require("express-handlebars"); // hbs

const bodyParser = require("body-parser");
const routes = require('./server/routes/student.js')


const app = express();
const port = 3000;
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files
app.use(express.static("public"));

//template engine
const handlebars = expresshandle.create({ extname: ".hbs" });
app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");

app.use('/', routes)


app.listen(port, () => {
    console.log("listening port:" + port);
});