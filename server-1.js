var express = require('express'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 8080;
	

var app = express();
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log('in the new index');
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/new', function(req, res) {
	console.log('in the new route');
	res.end("in the new route");
});

app.listen(port, function(){
  console.log('app running');
});