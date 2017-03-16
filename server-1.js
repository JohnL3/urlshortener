var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	checkUrl = require('./checkUrl'),
	shorten = require('./shorten'),
	port = process.env.PORT || 8080;
	
var list = {};

var app = express();
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/favicon.ico', function(req, res) {
	console.log('in favicon');
	res.end();
});*/

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});
//used for get sent with numbers to redirect 
app.get('/:id(\\d+)/',function(req,res) {
	console.log('in num '+req.params.id);
	var num = req.params.id;
	var	li = list.arr;
	var	allKeys = Object.keys(li);
		console.log('in keys '+allKeys);
	if(allKeys.includes(num)){
		res.redirect(li[+num][num]);
	} else {
		res.end('Error: not valid shorturl: choose from the following: '+allKeys)
	}
	
	
});
//used for all text get requests so i can process urls sent
app.all('/*', function (req, res, next) {
	console.log('in all' +req.params[0]);
	// process url with the checkUrl function
	var original_url = checkUrl(req.params[0]);
	// adding it to req so i can pass it to next get
	req.original_url = original_url;

	next() // pass control to the next handler
})


app.get('/*', function(req, res) {
	console.log('in the new route '+req.params[0]);
	var shortUrl='';
	if(!(req.original_url === 'Invalid Url')){
		//if valid url send it to function to get shortened url
		list = shorten(req.original_url);
		shortUrl = list.arr[0];
		shortUrl = Object.keys(shortUrl);
	} else {
		shortUrl = 'Invalid Url'
	}
	
	res.send({
		'original_url':req.original_url,
		'short_url':'https://little-url.herokuapp.com/'+shortUrl,
		'list':list
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