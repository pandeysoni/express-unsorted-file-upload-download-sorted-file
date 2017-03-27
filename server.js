const 
    express = require('express'),
    config = require('./server/config/config'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./server/config/routes')(app);

var port = config.server.port;

app.listen(port);

console.log('App started on port ' + port);

