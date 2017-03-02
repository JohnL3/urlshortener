module.exports = function checkUrl(url) {
	var regA = /^(https|http)\:\/.[^\(\)\s\%]{1,}$/g,
		checkurl = url;
		if(regA.test(checkurl)) {
			return checkurl;
		} else {
			return 'Invalid Url';
		}
	
}