var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	checkUrl = require('./checkUrl')
	port = process.env.PORT || 8080;
	

var app = express();
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	console.log('in the new index');
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.all('/*', function (req, res, next) {
	var original_url = checkUrl(req.params[0]);
	req.original_url = original_url;
	next() // pass control to the next handler
})
app.get('/*', function(req, res) {
	console.log('in the new route '+req.params[0]);
	//var original_url = checkUrl(req.params[0]);
	res.send({
		'original_url':req.original_url,
		'short_url':'https://little-url.herokuapp.com/8170'
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found ....');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('Error: '+err.status);
});

app.listen(port, function(){
  console.log('app running');
});