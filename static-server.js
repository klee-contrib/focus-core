var port = "3001";


//Creates a static server for each components example.
var express = require('express');
var app = express();
app.use('/' ,
  express.static(__dirname + "/dist")
);

//Start the application.
app.listen(port, function(){console.log('application started on port: ' , port)});
