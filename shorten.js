var urlHttp = "";
var arr = [];
var routes ={};


module.exports = function routing(req) {
	console.log('in routing '+JSON.stringify(arr));
  var num = arr.length;
  if(urlHttp === ''){
    routes = {
        [num]: req
    };
    urlHttp = req;
    arr.push(routes);
  } else {
    routes = {
        [num]: req
    };
    urlHttp = req;
    arr.push(routes);
  }
return {
  url:urlHttp,
  arr:arr,
}
}